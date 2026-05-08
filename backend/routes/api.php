<?php
declare(strict_types=1);

use Controllers\AvailabilityController;
use Controllers\AdminAuthController;
use Controllers\BookingController;
use Controllers\CsrfController;
use Core\Router;

/** @var Router $router */
$router->get('/api/csrf-token', [CsrfController::class, 'show']);
$router->get('/api/availability', [AvailabilityController::class, 'index']);
$router->patch('/api/availability/{date}', [AvailabilityController::class, 'update']);
$router->delete('/api/availability/{date}', [AvailabilityController::class, 'delete']);
$router->get('/api/bookings', [BookingController::class, 'index']);
$router->post('/api/bookings', [BookingController::class, 'store']);
$router->patch('/api/bookings/{id}', [BookingController::class, 'update']);
$router->post('/api/admin/login', [AdminAuthController::class, 'login']);
$router->post('/api/admin/logout', [AdminAuthController::class, 'logout']);
$router->get('/api/admin/me', [AdminAuthController::class, 'me']);
$router->get('/api/admin/csrf-token', [AdminAuthController::class, 'csrf']);
