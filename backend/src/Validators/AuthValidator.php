<?php
declare(strict_types=1);

namespace Validators;

final class AuthValidator
{
    public static function validateLogin(array $payload): array
    {
        $errors = [];
        $email = self::email($payload);
        $password = self::password($payload);

        if ($email === null) {
            $errors['email'] = 'Email is required.';
        } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL) || strlen($email) > 255) {
            $errors['email'] = 'Email must be a valid email address.';
        }

        if ($password === null) {
            $errors['password'] = 'Password is required.';
        } elseif (strlen($password) < 8 || strlen($password) > 255) {
            $errors['password'] = 'Password must be between 8 and 255 characters.';
        }

        return $errors;
    }

    public static function normalizeLogin(array $payload): array
    {
        return [
            'email' => self::email($payload) ?? '',
            'password' => self::password($payload) ?? '',
        ];
    }

    private static function email(array $payload): ?string
    {
        $value = $payload['email'] ?? null;

        if (!is_string($value)) {
            return null;
        }

        $email = strtolower(trim($value));

        return $email === '' ? null : $email;
    }

    private static function password(array $payload): ?string
    {
        $value = $payload['password'] ?? null;

        if (!is_string($value)) {
            return null;
        }

        return $value === '' ? null : $value;
    }
}
