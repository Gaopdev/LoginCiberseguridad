<?php
declare(strict_types=1);

require_once dirname(__DIR__) . "/vendor/autoload.php";

$dotenv = Dotenv\Dotenv::createImmutable(dirname(__DIR__));
$dotenv -> safeLoad();

$host = $_ENV['DB_HOST'];
$port = $_ENV['DB_PORT'];
$dbname = $_ENV['DB_DATABASE'];
$user = $_ENV['DB_USERNAME'];
$password = $_ENV['DB_PASSWORD'];

$dsn = "pgsql:host={$host};port={$port};dbname={$dbname}";

$pdo = new PDO($dsn, $user, $password, [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES => false,
]);