<?php
declare(strict_types=1);

namespace Controllers;

use Core\Response;

final class CsrfController
{
    public function show(): void
    {
        Response::success([
            'csrf_token' => $_SESSION['csrf_token'] ?? '',
        ]);
    }
}
