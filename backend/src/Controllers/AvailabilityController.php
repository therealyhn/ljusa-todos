<?php
declare(strict_types=1);

namespace Controllers;

use Core\Request;
use Core\Response;
use Middleware\AuthMiddleware;
use Services\AvailabilityService;
use Validators\MonthValidator;

final class AvailabilityController
{
    private AvailabilityService $service;

    public function __construct()
    {
        $this->service = new AvailabilityService();
    }

    public function index(): void
    {
        $month = Request::query('month');
        $error = MonthValidator::validate($month);

        if ($error !== null) {
            Response::error('Validation failed', 422, [
                'month' => $error,
            ]);
        }

        Response::success($this->service->getMonth($month));
    }

    public function update(string $date): void
    {
        AuthMiddleware::requireAdmin();

        $result = $this->service->updateOverride($date, Request::json());

        if (!$result['ok']) {
            Response::error($result['error'], $result['status'], $result['details'] ?? null);
        }

        Response::success($result['data'], $result['status']);
    }

    public function delete(string $date): void
    {
        AuthMiddleware::requireAdmin();

        $result = $this->service->deleteOverride($date);

        if (!$result['ok']) {
            Response::error($result['error'], $result['status'], $result['details'] ?? null);
        }

        Response::success($result['data'], $result['status']);
    }
}
