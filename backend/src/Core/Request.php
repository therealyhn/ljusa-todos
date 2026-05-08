<?php
declare(strict_types=1);

namespace Core;

final class Request
{
    public static function getMethod(): string
    {
        return strtoupper($_SERVER['REQUEST_METHOD'] ?? 'GET');
    }

    public static function getPath(): string
    {
        $path = parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH) ?: '/';
        $basePath = defined('API_BASE_PATH') ? rtrim((string) API_BASE_PATH, '/') : '';

        if ($basePath !== '' && str_starts_with($path, $basePath)) {
            $path = substr($path, strlen($basePath)) ?: '/';
        }

        if (!str_starts_with($path, '/api') && preg_match('#/api(?:/|$)#', $path, $match, PREG_OFFSET_CAPTURE)) {
            $path = substr($path, (int) $match[0][1]);
        }

        return '/' . ltrim($path, '/');
    }

    public static function query(string $key, mixed $default = null): mixed
    {
        return $_GET[$key] ?? $default;
    }

    public static function queryAll(): array
    {
        return $_GET;
    }

    public static function json(): array
    {
        $raw = file_get_contents('php://input');
        $decoded = json_decode($raw ?: '', true);

        return is_array($decoded) ? $decoded : [];
    }
}
