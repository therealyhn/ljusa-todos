<?php
declare(strict_types=1);

namespace Controllers;

use Core\Request;
use Core\Response;
use Middleware\AuthMiddleware;
use Services\AdminAuthService;

final class AdminAuthController
{
    private AdminAuthService $service;

    public function __construct()
    {
        $this->service = new AdminAuthService();
    }

    public function login(): void
    {
        $result = $this->service->login(Request::json());

        if (!$result['ok']) {
            Response::error($result['error'], $result['status'], $result['details'] ?? null);
        }

        Response::success($result['data'], $result['status']);
    }

    public function csrf(): void
    {
        Response::success([
            'csrf_token' => $_SESSION['csrf_token'] ?? '',
        ]);
    }

    public function logout(): void
    {
        AuthMiddleware::requireAdmin();
        $this->service->logout();

        Response::success(null);
    }

    public function me(): void
    {
        AuthMiddleware::requireAdmin();
        $admin = $this->service->currentAdmin();

        if ($admin === null) {
            Response::error('Unauthorized', 401);
        }

        Response::success($admin);
    }
}
