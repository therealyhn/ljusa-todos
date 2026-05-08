<?php
declare(strict_types=1);

namespace Validators;

use DateTimeImmutable;
use DateTimeZone;

final class AvailabilityOverrideValidator
{
    private const STATUSES = ['available', 'blocked'];

    public static function validateDate(string $date): ?string
    {
        $timezone = new DateTimeZone(defined('APP_TIMEZONE') ? APP_TIMEZONE : 'Europe/Belgrade');
        $parsed = DateTimeImmutable::createFromFormat('!Y-m-d', $date, $timezone);

        if (!$parsed instanceof DateTimeImmutable || $parsed->format('Y-m-d') !== $date) {
            return 'Date must use YYYY-MM-DD format.';
        }

        return null;
    }

    public static function validatePayload(array $payload): array
    {
        $errors = [];
        $status = self::status($payload);
        $reason = self::reason($payload);
        $note = self::note($payload);

        if ($status === null) {
            $errors['status'] = 'Status is required.';
        } elseif (!in_array($status, self::STATUSES, true)) {
            $errors['status'] = 'Status must be available or blocked.';
        }

        if ($reason !== null && mb_strlen($reason) > 160) {
            $errors['reason'] = 'Reason must be 160 characters or fewer.';
        }

        if ($note !== null && mb_strlen($note) > 3000) {
            $errors['note'] = 'Note must be 3000 characters or fewer.';
        }

        return $errors;
    }

    public static function normalize(array $payload): array
    {
        return [
            'status' => self::status($payload) ?? 'blocked',
            'reason' => self::reason($payload),
            'note' => self::note($payload),
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

    private static function reason(array $payload): ?string
    {
        return self::nullableTrim($payload['reason'] ?? null);
    }

    private static function note(array $payload): ?string
    {
        return self::nullableTrim($payload['note'] ?? null);
    }

    private static function nullableTrim(mixed $value): ?string
    {
        if (!is_string($value) && !is_numeric($value)) {
            return null;
        }

        $trimmed = trim((string) $value);

        return $trimmed === '' ? null : $trimmed;
    }
}
