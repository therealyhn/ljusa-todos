<?php
declare(strict_types=1);

namespace Validators;

use DateTimeImmutable;
use DateTimeZone;

final class BookingQueryValidator
{
    private const STATUSES = ['pending', 'confirmed', 'cancelled'];
    private const SORTS = ['created_at', 'event_date', 'status'];
    private const DIRECTIONS = ['asc', 'desc'];

    public static function validate(array $query): array
    {
        $filters = self::normalize($query);
        $errors = [];

        if ($filters['page'] < 1) {
            $errors['page'] = 'Page must be 1 or greater.';
        }

        if ($filters['per_page'] < 1 || $filters['per_page'] > 100) {
            $errors['perPage'] = 'Per page must be between 1 and 100.';
        }

        if ($filters['status'] !== null && !in_array($filters['status'], self::STATUSES, true)) {
            $errors['status'] = 'Status must be pending, confirmed, or cancelled.';
        }

        foreach (['from', 'to'] as $field) {
            if ($filters[$field] !== null && !self::validDate($filters[$field])) {
                $errors[$field] = ucfirst($field) . ' date must use YYYY-MM-DD format.';
            }
        }

        if (
            $filters['from'] !== null
            && $filters['to'] !== null
            && empty($errors['from'])
            && empty($errors['to'])
            && $filters['from'] > $filters['to']
        ) {
            $errors['to'] = 'To date must be after from date.';
        }

        if ($filters['sort'] !== null && !in_array($filters['sort'], self::SORTS, true)) {
            $errors['sort'] = 'Sort must be created_at, event_date, or status.';
        }

        if (!in_array($filters['direction'], self::DIRECTIONS, true)) {
            $errors['direction'] = 'Direction must be asc or desc.';
        }

        if ($filters['search'] !== null && mb_strlen($filters['search']) > 120) {
            $errors['search'] = 'Search must be 120 characters or fewer.';
        }

        return $errors;
    }

    public static function normalize(array $query): array
    {
        $page = filter_var($query['page'] ?? 1, FILTER_VALIDATE_INT);
        $perPage = filter_var($query['perPage'] ?? $query['per_page'] ?? 20, FILTER_VALIDATE_INT);
        $status = self::nullableLower($query['status'] ?? null);
        $sort = self::nullableLower($query['sort'] ?? 'created_at') ?? 'created_at';
        $direction = self::nullableLower($query['direction'] ?? 'desc') ?? 'desc';

        return [
            'page' => $page === false ? 0 : (int) $page,
            'per_page' => $perPage === false ? 0 : (int) $perPage,
            'status' => $status,
            'from' => self::nullableTrim($query['from'] ?? null),
            'to' => self::nullableTrim($query['to'] ?? null),
            'search' => self::nullableTrim($query['search'] ?? null),
            'sort' => $sort,
            'direction' => $direction,
        ];
    }

    private static function nullableTrim(mixed $value): ?string
    {
        if (!is_string($value) && !is_numeric($value)) {
            return null;
        }

        $trimmed = trim((string) $value);

        return $trimmed === '' ? null : $trimmed;
    }

    private static function nullableLower(mixed $value): ?string
    {
        $trimmed = self::nullableTrim($value);

        return $trimmed === null ? null : strtolower($trimmed);
    }

    private static function validDate(string $value): bool
    {
        $timezone = new DateTimeZone(defined('APP_TIMEZONE') ? APP_TIMEZONE : 'Europe/Belgrade');
        $date = DateTimeImmutable::createFromFormat('!Y-m-d', $value, $timezone);

        return $date instanceof DateTimeImmutable && $date->format('Y-m-d') === $value;
    }
}
