<?php
declare(strict_types=1);

namespace Services;

use Core\Database;
use PDOException;
use Repositories\BookingRepository;
use Throwable;
use Validators\BookingQueryValidator;
use Validators\BookingStatusValidator;
use Validators\BookingValidator;

final class BookingService
{
    private BookingRepository $repository;
    private EmailService $emailService;

    public function __construct()
    {
        $this->repository = new BookingRepository();
        $this->emailService = new EmailService();
    }

    public function create(array $payload): array
    {
        $errors = BookingValidator::validate($payload);

        if ($errors !== []) {
            return [
                'ok' => false,
                'status' => 422,
                'error' => 'Validation failed',
                'details' => $errors,
            ];
        }

        $data = BookingValidator::normalize($payload);

        if (
            $data['booking_option_id'] !== null
            && !$this->repository->activeBookingOptionExists($data['booking_option_id'])
        ) {
            return [
                'ok' => false,
                'status' => 422,
                'error' => 'Validation failed',
                'details' => [
                    'booking_option_id' => 'Selected booking option is not available.',
                ],
            ];
        }

        $blockedAvailability = $this->repository->findBlockedAvailabilityByDate($data['event_date']);

        if ($blockedAvailability !== null) {
            return [
                'ok' => false,
                'status' => 409,
                'error' => 'Selected date is not available.',
                'details' => [
                    'event_date' => $blockedAvailability['reason'] ?: 'blocked',
                ],
            ];
        }

        if ($this->repository->findActiveBookingByDate($data['event_date']) !== null) {
            return [
                'ok' => false,
                'status' => 409,
                'error' => 'Selected date is already booked.',
                'details' => [
                    'event_date' => 'booked',
                ],
            ];
        }

        $data['public_reference'] = $this->makeReference();
        $data['client_ip'] = $this->clientIp();
        $data['user_agent'] = substr($_SERVER['HTTP_USER_AGENT'] ?? '', 0, 255) ?: null;

        $db = Database::getConnection();

        try {
            $db->beginTransaction();
            $booking = $this->repository->create($data);
            $db->commit();
        } catch (PDOException $exception) {
            if ($db->inTransaction()) {
                $db->rollBack();
            }

            if ($exception->getCode() === '23000') {
                return [
                    'ok' => false,
                    'status' => 409,
                    'error' => 'Selected date is already booked.',
                    'details' => [
                        'event_date' => 'booked',
                    ],
                ];
            }

            throw $exception;
        }

        $email = $this->sendBookingCreatedEmails($booking);

        if (($email['sent'] ?? false) === true) {
            $this->repository->markConfirmationSent((int) $booking['id']);
            $booking = $this->repository->findById((int) $booking['id']);
        }

        return [
            'ok' => true,
            'status' => 201,
            'data' => [
                'booking' => $booking,
                'email' => $email,
            ],
        ];
    }

    public function listForAdmin(array $query): array
    {
        $errors = BookingQueryValidator::validate($query);

        if ($errors !== []) {
            return [
                'ok' => false,
                'status' => 422,
                'error' => 'Validation failed',
                'details' => $errors,
            ];
        }

        return [
            'ok' => true,
            'status' => 200,
            'data' => $this->repository->paginateForAdmin(BookingQueryValidator::normalize($query)),
        ];
    }

    public function updateStatusForAdmin(int $id, array $payload): array
    {
        if ($id <= 0) {
            return [
                'ok' => false,
                'status' => 400,
                'error' => 'Invalid booking ID.',
            ];
        }

        $errors = BookingStatusValidator::validate($payload);

        if ($errors !== []) {
            return [
                'ok' => false,
                'status' => 422,
                'error' => 'Validation failed',
                'details' => $errors,
            ];
        }

        $data = BookingStatusValidator::normalize($payload);

        try {
            $booking = $this->repository->updateStatus($id, $data['status'], $data['admin_notes']);
        } catch (PDOException $exception) {
            if ($exception->getCode() === '23000') {
                return [
                    'ok' => false,
                    'status' => 409,
                    'error' => 'Cannot set this status because the event date conflicts with another active booking.',
                ];
            }

            throw $exception;
        }

        if ($booking === null) {
            return [
                'ok' => false,
                'status' => 404,
                'error' => 'Booking not found.',
            ];
        }

        return [
            'ok' => true,
            'status' => 200,
            'data' => $booking,
        ];
    }

    private function makeReference(): string
    {
        try {
            return 'XTY' . strtoupper(substr(bin2hex(random_bytes(5)), 0, 9));
        } catch (Throwable) {
            return 'XTY' . strtoupper(substr(uniqid('', true), -9));
        }
    }

    private function clientIp(): ?string
    {
        $ip = $_SERVER['REMOTE_ADDR'] ?? null;

        if (!is_string($ip) || $ip === '') {
            return null;
        }

        return substr($ip, 0, 45);
    }

    private function sendBookingCreatedEmails(array $booking): array
    {
        try {
            return $this->emailService->sendBookingCreatedEmails($booking);
        } catch (Throwable $exception) {
            error_log('Booking email failed for booking ' . ($booking['id'] ?? 'unknown') . ': ' . $exception->getMessage());

            return [
                'sent' => false,
                'skipped' => false,
                'error' => 'email_failed',
            ];
        }
    }
}
