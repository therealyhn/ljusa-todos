<?php
declare(strict_types=1);

namespace Services;

use Repositories\AdminRepository;
use Validators\AuthValidator;

final class AdminAuthService
{
    private const MAX_ATTEMPTS = 5;

    private AdminRepository $repository;

    public function __construct()
    {
        $this->repository = new AdminRepository();
    }

    public function login(array $payload): array
    {
        $errors = AuthValidator::validateLogin($payload);

        if ($errors !== []) {
            return [
                'ok' => false,
                'status' => 422,
                'error' => 'Validation failed',
                'details' => $errors,
            ];
        }

        $credentials = AuthValidator::normalizeLogin($payload);
        $ip = $this->clientIp();

        if ($this->repository->countRecentLoginAttempts($credentials['email'], $ip) >= self::MAX_ATTEMPTS) {
            return [
                'ok' => false,
                'status' => 429,
                'error' => 'Too many login attempts. Try again later.',
            ];
        }

        $this->repository->recordLoginAttempt($credentials['email'], $ip);
        $admin = $this->repository->findActiveByEmail($credentials['email']);

        if ($admin === null) {
            password_hash('invalid-admin-password', PASSWORD_BCRYPT);
            return $this->invalidCredentials();
        }

        if (!password_verify($credentials['password'], $admin['password_hash'])) {
            return $this->invalidCredentials();
        }

        session_regenerate_id(true);

        $_SESSION['user_id'] = (int) $admin['id'];
        $_SESSION['user_role'] = 'admin';
        $_SESSION['last_activity'] = time();

        if (empty($_SESSION['csrf_token'])) {
            $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
        }

        $this->repository->updateLastLogin((int) $admin['id']);

        return [
            'ok' => true,
            'status' => 200,
            'data' => [
                'admin' => [
                    'id' => (int) $admin['id'],
                    'name' => $admin['name'],
                    'email' => $admin['email'],
                    'role' => $admin['role'],
                ],
                'csrf_token' => $_SESSION['csrf_token'],
            ],
        ];
    }

    public function currentAdmin(): ?array
    {
        $adminId = (int) ($_SESSION['user_id'] ?? 0);

        if ($adminId <= 0 || ($_SESSION['user_role'] ?? null) !== 'admin') {
            return null;
        }

        return $this->repository->findSafeById($adminId);
    }

    public function logout(): void
    {
        $_SESSION = [];

        if (ini_get('session.use_cookies')) {
            $params = session_get_cookie_params();
            setcookie(
                session_name(),
                '',
                time() - 42000,
                $params['path'],
                $params['domain'],
                $params['secure'],
                $params['httponly']
            );
        }

        session_destroy();
    }

    private function invalidCredentials(): array
    {
        return [
            'ok' => false,
            'status' => 401,
            'error' => 'Invalid credentials.',
        ];
    }

    private function clientIp(): string
    {
        $ip = $_SERVER['REMOTE_ADDR'] ?? '0.0.0.0';

        return is_string($ip) && $ip !== '' ? substr($ip, 0, 45) : '0.0.0.0';
    }
}
