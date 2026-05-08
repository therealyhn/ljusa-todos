<?php
declare(strict_types=1);

define('APP_ENV', 'development');
define('APP_TIMEZONE', 'Europe/Belgrade');
define('API_BASE_PATH', '');

define('DB_HOST', 'localhost');
define('DB_NAME', 'ljusaitodos');
define('DB_USER', 'root');
define('DB_PASS', '');

define('FRONTEND_ORIGINS', [
    'http://localhost:5173',
    'http://127.0.0.1:5173',
]);

define('MAIL_ENABLED', false);
define('MAIL_HOST', 'smtp.example.com');
define('MAIL_PORT', 587);
define('MAIL_USERNAME', 'smtp-user@example.com');
define('MAIL_PASSWORD', 'change-me');
define('MAIL_ENCRYPTION', 'tls');
define('MAIL_FROM_EMAIL', 'booking@example.com');
define('MAIL_FROM_NAME', 'Ljusaitodos Booking');
define('MAIL_ADMIN_EMAIL', 'booking@example.com');
define('MAIL_ADMIN_NAME', 'Ljusaitodos Booking');
