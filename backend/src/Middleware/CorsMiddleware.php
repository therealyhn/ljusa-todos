<?php
declare(strict_types=1);

namespace Middleware;

final class CorsMiddleware
{
    public static function handle(): void
    {
        $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
        $allowedOrigins = defined('FRONTEND_ORIGINS') ? FRONTEND_ORIGINS : [];

        if (is_array($allowedOrigins) && in_array($origin, $allowedOrigins, true)) {
            header('Access-Control-Allow-Origin: ' . $origin);
            header('Access-Control-Allow-Credentials: true');
            header('Access-Control-Allow-Methods: GET, POST, PATCH, OPTIONS');
            header('Access-Control-Allow-Headers: Content-Type, X-CSRF-Token, Authorization');
            header('Access-Control-Max-Age: 86400');
        }

        if (($_SERVER['REQUEST_METHOD'] ?? 'GET') === 'OPTIONS') {
            http_response_code(204);
            exit;
        }
    }
}
