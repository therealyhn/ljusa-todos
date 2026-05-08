<?php
declare(strict_types=1);

namespace Controllers;

use Core\Request;
use Core\Response;
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
}
