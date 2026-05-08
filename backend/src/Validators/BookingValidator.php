<?php
declare(strict_types=1);

namespace Validators;

use DateTimeImmutable;
use DateTimeZone;

final class BookingValidator
{
    public static function validate(array $payload): array
    {
        $data = self::normalize($payload);
        $errors = [];

        self::requireString($data, $errors, 'client_name', 'Client name', 2, 120);
        self::requireEmail($data, $errors);
        self::requireString($data, $errors, 'client_phone', 'Client phone', 6, 40);
        self::requireString($data, $errors, 'event_type', 'Event type', 2, 80);
        self::requireDate($data, $errors);
        self::requireString($data, $errors, 'city', 'City', 2, 120);

        self::optionalString($data, $errors, 'company_name', 'Company name', 160);
        self::optionalString($data, $errors, 'venue_name', 'Venue name', 160);
        self::optionalString($data, $errors, 'venue_address', 'Venue address', 255);
        self::optionalString($data, $errors, 'country', 'Country', 120);
        self::optionalString($data, $errors, 'budget_range', 'Budget range', 80);
        self::optionalString($data, $errors, 'message', 'Message', 3000);
        self::optionalTime($data, $errors, 'event_start_time', 'Event start time');
        self::optionalTime($data, $errors, 'event_end_time', 'Event end time');
        self::optionalInteger($data, $errors, 'booking_option_id', 'Booking option', 1, PHP_INT_MAX);
        self::optionalInteger($data, $errors, 'guest_count', 'Guest count', 1, 10000);

        if (
            !isset($errors['event_start_time'], $errors['event_end_time'])
            && $data['event_start_time'] !== null
            && $data['event_end_time'] !== null
            && $data['event_end_time'] <= $data['event_start_time']
        ) {
            $errors['event_end_time'] = 'Event end time must be after start time.';
        }

        return $errors;
    }

    public static function normalize(array $payload): array
    {
        return [
            'booking_option_id' => self::nullableInt(self::field($payload, 'bookingOptionId', 'booking_option_id')),
            'client_name' => self::nullableTrim(self::field($payload, 'clientName', 'client_name')),
            'client_email' => self::nullableTrim(self::field($payload, 'clientEmail', 'client_email')),
            'client_phone' => self::nullableTrim(self::field($payload, 'clientPhone', 'client_phone')),
            'company_name' => self::nullableTrim(self::field($payload, 'companyName', 'company_name')),
            'event_type' => self::nullableTrim(self::field($payload, 'eventType', 'event_type')),
            'event_date' => self::nullableTrim(self::field($payload, 'eventDate', 'event_date')),
            'event_start_time' => self::normalizeTime(self::field($payload, 'eventStartTime', 'event_start_time')),
            'event_end_time' => self::normalizeTime(self::field($payload, 'eventEndTime', 'event_end_time')),
            'venue_name' => self::nullableTrim(self::field($payload, 'venueName', 'venue_name')),
            'venue_address' => self::nullableTrim(self::field($payload, 'venueAddress', 'venue_address')),
            'city' => self::nullableTrim(self::field($payload, 'city', 'city')),
            'country' => self::nullableTrim(self::field($payload, 'country', 'country')) ?? 'Serbia',
            'guest_count' => self::nullableInt(self::field($payload, 'guestCount', 'guest_count')),
            'budget_range' => self::nullableTrim(self::field($payload, 'budgetRange', 'budget_range')),
            'message' => self::nullableTrim(self::field($payload, 'message', 'message')),
        ];
    }

    private static function field(array $payload, string $camelKey, string $snakeKey): mixed
    {
        return $payload[$camelKey] ?? $payload[$snakeKey] ?? null;
    }

    private static function nullableTrim(mixed $value): ?string
    {
        if (!is_string($value) && !is_numeric($value)) {
            return null;
        }

        $trimmed = trim((string) $value);

        return $trimmed === '' ? null : $trimmed;
    }

    private static function nullableInt(mixed $value): ?int
    {
        if ($value === null || $value === '') {
            return null;
        }

        return filter_var($value, FILTER_VALIDATE_INT) === false ? null : (int) $value;
    }

    private static function normalizeTime(mixed $value): ?string
    {
        $time = self::nullableTrim($value);

        if ($time === null) {
            return null;
        }

        if (preg_match('/^\d{2}:\d{2}$/', $time)) {
            return $time . ':00';
        }

        return $time;
    }

    private static function requireString(
        array $data,
        array &$errors,
        string $field,
        string $label,
        int $min,
        int $max
    ): void {
        if ($data[$field] === null) {
            $errors[$field] = $label . ' is required.';
            return;
        }

        $length = mb_strlen($data[$field]);

        if ($length < $min || $length > $max) {
            $errors[$field] = $label . " must be between {$min} and {$max} characters.";
        }
    }

    private static function optionalString(array $data, array &$errors, string $field, string $label, int $max): void
    {
        if ($data[$field] !== null && mb_strlen($data[$field]) > $max) {
            $errors[$field] = $label . " must be {$max} characters or fewer.";
        }
    }

    private static function requireEmail(array $data, array &$errors): void
    {
        if ($data['client_email'] === null) {
            $errors['client_email'] = 'Client email is required.';
            return;
        }

        if (!filter_var($data['client_email'], FILTER_VALIDATE_EMAIL) || mb_strlen($data['client_email']) > 255) {
            $errors['client_email'] = 'Client email must be a valid email address.';
        }
    }

    private static function requireDate(array $data, array &$errors): void
    {
        if ($data['event_date'] === null) {
            $errors['event_date'] = 'Event date is required.';
            return;
        }

        $timezone = new DateTimeZone(defined('APP_TIMEZONE') ? APP_TIMEZONE : 'Europe/Belgrade');
        $date = DateTimeImmutable::createFromFormat('!Y-m-d', $data['event_date'], $timezone);

        if (!$date || $date->format('Y-m-d') !== $data['event_date']) {
            $errors['event_date'] = 'Event date must use YYYY-MM-DD format.';
            return;
        }

        if ($date < new DateTimeImmutable('today', $timezone)) {
            $errors['event_date'] = 'Event date cannot be in the past.';
        }
    }

    private static function optionalTime(array $data, array &$errors, string $field, string $label): void
    {
        if ($data[$field] !== null && !preg_match('/^([01]\d|2[0-3]):[0-5]\d:00$/', $data[$field])) {
            $errors[$field] = $label . ' must use HH:MM format.';
        }
    }

    private static function optionalInteger(
        array $data,
        array &$errors,
        string $field,
        string $label,
        int $min,
        int $max
    ): void {
        if ($data[$field] !== null && ($data[$field] < $min || $data[$field] > $max)) {
            $errors[$field] = $label . " must be between {$min} and {$max}.";
        }
    }
}
