<?php
declare(strict_types=1);

namespace Validators;

use DateTimeImmutable;
use DateTimeZone;

final class MonthValidator
{
    public static function validate(mixed $value): ?string
    {
        if (!is_string($value) || !preg_match('/^\d{4}-\d{2}$/', $value)) {
            return 'Month must use YYYY-MM format.';
        }

        $timezone = new DateTimeZone(defined('APP_TIMEZONE') ? APP_TIMEZONE : 'Europe/Belgrade');
        $date = DateTimeImmutable::createFromFormat('!Y-m-d', $value . '-01', $timezone);

        if (!$date || $date->format('Y-m') !== $value) {
            return 'Month must be a valid calendar month.';
        }

        return null;
    }
}
