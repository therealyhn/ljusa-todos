<?php
declare(strict_types=1);

namespace Middleware;

use Core\Response;

final class AuthMiddleware
{
    private const SESSION_TIMEOUT_SECONDS = 1800;

    public static function requireAdmin(): void
    {
        self::requireAuthenticated();

        if (($_SESSION['user_role'] ?? null) !== 'admin') {
            Response::error('Forbidden', 403);
        }
    }

    private static function requireAuthenticated(): void
    {
        $lastActivity = (int) ($_SESSION['last_activity'] ?? 0);

        if ($lastActivity > 0 && (time() - $lastActivity) > self::SESSION_TIMEOUT_SECONDS) {
            self::destroySession();
            Response::error('Session expired', 401);
        }

        if (empty($_SESSION['user_id'])) {
            Response::error('Unauthorized', 401);
        }

        $_SESSION['last_activity'] = time();
    }

    private static function destroySession(): void
    {
        $_SESSION = [];
        session_destroy();
    }
}
