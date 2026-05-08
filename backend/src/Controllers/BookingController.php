<?php
declare(strict_types=1);

namespace Controllers;

use Core\Request;
use Core\Response;
use Middleware\AuthMiddleware;
use Services\BookingService;

final class BookingController
{
    private BookingService $service;

    public function __construct()
    {
        $this->service = new BookingService();
    }

    public function store(): void
    {
        $result = $this->service->create(Request::json());

        if (!$result['ok']) {
            Response::error($result['error'], $result['status'], $result['details'] ?? null);
        }

        Response::success($result['data'], $result['status']);
    }

    public function index(): void
    {
        AuthMiddleware::requireAdmin();

        $result = $this->service->listForAdmin(Request::queryAll());

        if (!$result['ok']) {
            Response::error($result['error'], $result['status'], $result['details'] ?? null);
        }

        Response::success($result['data'], $result['status']);
    }

    public function update(string $id): void
    {
        AuthMiddleware::requireAdmin();

        $result = $this->service->updateStatusForAdmin((int) $id, Request::json());

        if (!$result['ok']) {
            Response::error($result['error'], $result['status'], $result['details'] ?? null);
        }

        Response::success($result['data'], $result['status']);
    }
}
