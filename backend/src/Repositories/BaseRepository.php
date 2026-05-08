<?php
declare(strict_types=1);

namespace Repositories;

use Core\Database;
use PDO;

abstract class BaseRepository
{
    protected PDO $db;

    public function __construct()
    {
        $this->db = Database::getConnection();
    }
}
