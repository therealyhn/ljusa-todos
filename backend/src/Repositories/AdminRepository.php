<?php
declare(strict_types=1);

namespace Repositories;

final class AdminRepository extends BaseRepository
{
    public function findActiveByEmail(string $email): ?array
    {
        $statement = $this->db->prepare(
            'SELECT id, name, email, password_hash, role, is_active
             FROM admin_users
             WHERE email = ?
               AND is_active = 1
             LIMIT 1'
        );
        $statement->execute([$email]);

        $admin = $statement->fetch();

        return $admin ?: null;
    }

    public function findSafeById(int $id): ?array
    {
        $statement = $this->db->prepare(
            'SELECT id, name, email, role, last_login_at, created_at
             FROM admin_users
             WHERE id = ?
               AND is_active = 1
             LIMIT 1'
        );
        $statement->execute([$id]);

        $admin = $statement->fetch();

        return $admin ?: null;
    }

    public function updateLastLogin(int $id): void
    {
        $statement = $this->db->prepare('UPDATE admin_users SET last_login_at = NOW() WHERE id = ?');
        $statement->execute([$id]);
    }

    public function countRecentLoginAttempts(string $email, string $ip): int
    {
        $statement = $this->db->prepare(
            'SELECT COUNT(*)
             FROM login_attempts
             WHERE (email = ? OR ip = ?)
               AND attempted_at > DATE_SUB(NOW(), INTERVAL 15 MINUTE)'
        );
        $statement->execute([$email, $ip]);

        return (int) $statement->fetchColumn();
    }

    public function recordLoginAttempt(string $email, string $ip): void
    {
        $statement = $this->db->prepare('INSERT INTO login_attempts (email, ip) VALUES (?, ?)');
        $statement->execute([$email, $ip]);
    }
}
