<?php
declare(strict_types=1);

namespace Middleware;

use Core\Response;

final class CsrfMiddleware
{
    private const STATEFUL_METHODS = ['POST', 'PUT', 'PATCH', 'DELETE'];

    public static function validate(string $method): void
    {
        if (!in_array($method, self::STATEFUL_METHODS, true)) {
            return;
        }

        $token = $_SERVER['HTTP_X_CSRF_TOKEN'] ?? '';
        $sessionToken = $_SESSION['csrf_token'] ?? '';

        if (!is_string($token) || $token === '' || !is_string($sessionToken) || !hash_equals($sessionToken, $token)) {
            Response::error('Invalid CSRF token', 403);
        }
    }
}
