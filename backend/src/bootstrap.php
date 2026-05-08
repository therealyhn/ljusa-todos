<?php
declare(strict_types=1);

spl_autoload_register(static function (string $class): void {
    $path = __DIR__ . '/' . str_replace('\\', '/', $class) . '.php';

    if (is_file($path)) {
        require_once $path;
    }
});
