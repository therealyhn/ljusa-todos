<?php
declare(strict_types=1);

if (PHP_SAPI !== 'cli') {
    http_response_code(403);
    exit('Forbidden');
}

[$script, $name, $email, $password] = array_pad($argv, 4, null);

if ($name === null || $email === null || $password === null) {
    fwrite(STDERR, "Usage: php {$script} \"Admin Name\" admin@example.com \"StrongPassword\"\n");
    exit(1);
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    fwrite(STDERR, "Email is not valid.\n");
    exit(1);
}

if (strlen($password) < 8) {
    fwrite(STDERR, "Password must be at least 8 characters.\n");
    exit(1);
}

$hash = password_hash($password, PASSWORD_BCRYPT);

$escapedName = str_replace("'", "''", $name);
$escapedEmail = str_replace("'", "''", strtolower($email));
$escapedHash = str_replace("'", "''", $hash);

echo "INSERT INTO admin_users (name, email, password_hash) VALUES ('{$escapedName}', '{$escapedEmail}', '{$escapedHash}') ";
echo "ON DUPLICATE KEY UPDATE name = VALUES(name), password_hash = VALUES(password_hash), is_active = 1;\n";
