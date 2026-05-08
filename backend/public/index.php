<?php
declare(strict_types=1);

$vendorAutoload = __DIR__ . '/../vendor/autoload.php';

if (is_file($vendorAutoload)) {
    require_once $vendorAutoload;
}

require_once __DIR__ . '/../src/bootstrap.php';

use Core\Request;
use Core\Response;
use Core\Router;
use Middleware\CorsMiddleware;
use Middleware\CsrfMiddleware;

$configPath = __DIR__ . '/../config/config.php';

if (!is_file($configPath)) {
    define('APP_ENV', 'production');
    define('FRONTEND_ORIGINS', []);
    CorsMiddleware::handle();
    Response::error('Application config is missing.', 500);
}

require_once $configPath;

date_default_timezone_set(defined('APP_TIMEZONE') ? APP_TIMEZONE : 'Europe/Belgrade');

CorsMiddleware::handle();

ini_set('display_errors', APP_ENV === 'development' ? '1' : '0');
ini_set('log_errors', '1');
ini_set('error_log', __DIR__ . '/../storage/logs/php_errors.log');
error_reporting(E_ALL);

set_exception_handler(static function (Throwable $exception): void {
    error_log($exception->getMessage() . ' in ' . $exception->getFile() . ':' . $exception->getLine());

    if (APP_ENV === 'development') {
        Response::error($exception->getMessage(), 500);
    }

    Response::error('Internal server error', 500);
});

session_set_cookie_params([
    'lifetime' => 0,
    'path' => '/',
    'secure' => APP_ENV === 'production',
    'httponly' => true,
    'samesite' => 'Strict',
]);
session_start();

if (empty($_SESSION['csrf_token'])) {
    $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
}

CsrfMiddleware::validate(Request::getMethod());

$router = new Router();
require_once __DIR__ . '/../routes/api.php';
$router->dispatch(Request::getMethod(), Request::getPath());
