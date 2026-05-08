<?php
declare(strict_types=1);

namespace Core;

final class Router
{
    private array $routes = [];

    public function get(string $path, callable|array $handler): void
    {
        $this->add('GET', $path, $handler);
    }

    public function post(string $path, callable|array $handler): void
    {
        $this->add('POST', $path, $handler);
    }

    public function patch(string $path, callable|array $handler): void
    {
        $this->add('PATCH', $path, $handler);
    }

    public function delete(string $path, callable|array $handler): void
    {
        $this->add('DELETE', $path, $handler);
    }

    public function dispatch(string $method, string $path): void
    {
        foreach ($this->routes[$method] ?? [] as $route => $handler) {
            $pattern = '#^' . preg_replace('/\{[^}]+}/', '([^/]+)', $route) . '$#';

            if (!preg_match($pattern, $path, $matches)) {
                continue;
            }

            array_shift($matches);
            $this->runHandler($handler, $matches);
            return;
        }

        Response::error('Not found', 404);
    }

    private function add(string $method, string $path, callable|array $handler): void
    {
        $this->routes[$method][$path] = $handler;
    }

    private function runHandler(callable|array $handler, array $params): void
    {
        if (is_array($handler)) {
            [$controller, $method] = $handler;
            (new $controller())->{$method}(...$params);
            return;
        }

        $handler(...$params);
    }
}
