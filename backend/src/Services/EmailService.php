<?php
declare(strict_types=1);

namespace Services;

use PHPMailer\PHPMailer\PHPMailer;
use RuntimeException;

final class EmailService
{
    public function sendBookingCreatedEmails(array $booking): array
    {
        if (!defined('MAIL_ENABLED') || MAIL_ENABLED !== true) {
            return [
                'sent' => false,
                'skipped' => true,
            ];
        }

        if (!class_exists(PHPMailer::class)) {
            throw new RuntimeException('PHPMailer is not installed. Run composer install in backend/.');
        }

        $this->sendClientReceipt($booking);
        $this->sendAdminNotification($booking);

        return [
            'sent' => true,
            'skipped' => false,
        ];
    }

    private function sendClientReceipt(array $booking): void
    {
        $mail = $this->baseMailer();
        $mail->addAddress($booking['client_email'], $booking['client_name']);
        $mail->Subject = 'XTY booking request received - ' . $booking['public_reference'];
        $mail->Body = $this->clientBody($booking);
        $mail->AltBody = strip_tags(str_replace(['<br>', '<br/>', '<br />'], PHP_EOL, $mail->Body));
        $mail->send();
    }

    private function sendAdminNotification(array $booking): void
    {
        $mail = $this->baseMailer();
        $mail->addAddress(MAIL_ADMIN_EMAIL, defined('MAIL_ADMIN_NAME') ? MAIL_ADMIN_NAME : 'XTY Admin');
        $mail->Subject = 'New booking request - ' . $booking['public_reference'];
        $mail->Body = $this->adminBody($booking);
        $mail->AltBody = strip_tags(str_replace(['<br>', '<br/>', '<br />'], PHP_EOL, $mail->Body));
        $mail->send();
    }

    private function baseMailer(): PHPMailer
    {
        $mail = new PHPMailer(true);
        $mail->isSMTP();
        $mail->Host = MAIL_HOST;
        $mail->SMTPAuth = true;
        $mail->Username = MAIL_USERNAME;
        $mail->Password = MAIL_PASSWORD;
        $mail->Port = (int) MAIL_PORT;

        if (defined('MAIL_ENCRYPTION') && MAIL_ENCRYPTION !== '') {
            $mail->SMTPSecure = MAIL_ENCRYPTION;
        }

        $mail->CharSet = 'UTF-8';
        $mail->isHTML(true);
        $mail->setFrom(MAIL_FROM_EMAIL, MAIL_FROM_NAME);

        return $mail;
    }

    private function clientBody(array $booking): string
    {
        return sprintf(
            'Hi %s,<br><br>Your XTY booking request has been received.<br><br>Reference: <strong>%s</strong><br>Date: %s<br>City: %s<br>Event type: %s<br><br>We will review the details and get back to you.',
            htmlspecialchars($booking['client_name'], ENT_QUOTES | ENT_HTML5, 'UTF-8'),
            htmlspecialchars($booking['public_reference'], ENT_QUOTES | ENT_HTML5, 'UTF-8'),
            htmlspecialchars($booking['event_date'], ENT_QUOTES | ENT_HTML5, 'UTF-8'),
            htmlspecialchars($booking['city'], ENT_QUOTES | ENT_HTML5, 'UTF-8'),
            htmlspecialchars($booking['event_type'], ENT_QUOTES | ENT_HTML5, 'UTF-8')
        );
    }

    private function adminBody(array $booking): string
    {
        return sprintf(
            'New booking request received.<br><br>Reference: <strong>%s</strong><br>Client: %s<br>Email: %s<br>Phone: %s<br>Date: %s<br>City: %s<br>Guests: %s<br>Message:<br>%s',
            htmlspecialchars($booking['public_reference'], ENT_QUOTES | ENT_HTML5, 'UTF-8'),
            htmlspecialchars($booking['client_name'], ENT_QUOTES | ENT_HTML5, 'UTF-8'),
            htmlspecialchars($booking['client_email'], ENT_QUOTES | ENT_HTML5, 'UTF-8'),
            htmlspecialchars($booking['client_phone'], ENT_QUOTES | ENT_HTML5, 'UTF-8'),
            htmlspecialchars($booking['event_date'], ENT_QUOTES | ENT_HTML5, 'UTF-8'),
            htmlspecialchars($booking['city'], ENT_QUOTES | ENT_HTML5, 'UTF-8'),
            htmlspecialchars((string) ($booking['guest_count'] ?? 'Not provided'), ENT_QUOTES | ENT_HTML5, 'UTF-8'),
            nl2br(htmlspecialchars((string) ($booking['message'] ?? ''), ENT_QUOTES | ENT_HTML5, 'UTF-8'))
        );
    }
}
