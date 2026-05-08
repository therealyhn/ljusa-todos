<?php
declare(strict_types=1);

namespace Validators;

final class BookingStatusValidator
{
    private const STATUSES = ['pending', 'confirmed', 'cancelled'];

    public static function validate(array $payload): array
    {
        $errors = [];
        $status = self::status($payload);
        $adminNotes = self::adminNotes($payload);

        if ($status === null) {
            $errors['status'] = 'Status is required.';
        } elseif (!in_array($status, self::STATUSES, true)) {
            $errors['status'] = 'Status must be pending, confirmed, or cancelled.';
        }

        if ($adminNotes !== null && mb_strlen($adminNotes) > 3000) {
            $errors['admin_notes'] = 'Admin notes must be 3000 characters or fewer.';
        }

        return $errors;
    }

    public static function normalize(array $payload): array
    {
        return [
            'status' => self::status($payload) ?? '',
            'admin_notes' => self::adminNotes($payload),
        ];
    }

    private static function status(array $payload): ?string
    {
        $value = $payload['status'] ?? null;

        if (!is_string($value)) {
            return null;
        }

        $status = strtolower(trim($value));

        return $status === '' ? null : $status;
    }

    private static function adminNotes(array $payload): ?string
    {
        $value = $payload['adminNotes'] ?? $payload['admin_notes'] ?? null;

        if (!is_string($value) && !is_numeric($value)) {
            return null;
        }

        $notes = trim((string) $value);

        return $notes === '' ? null : $notes;
    }
}
