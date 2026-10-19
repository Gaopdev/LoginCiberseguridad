<?php

declare(strict_types=1);
require_once dirname(__DIR__) . '/config/cors.php';

header('Content-Type: application/json; charset=utf-8');

function respond(int $status, array $data): never{
    http_response_code($status);

    echo json_encode(
        $data,
        JSON_UNESCAPED_UNICODE
    );
    exit;
}

if($_SERVER['REQUEST_METHOD'] != 'POST'){
    header('ALLOW: POST');

    respond(405,[
        'error' => 'Metodo no permitido'
    ]);
}

try {
    require_once dirname(__DIR__) . '/config/database.php';

    $input = json_decode(
        file_get_contents('php://input'),
        true
    );

    if(!is_array($input)){
        respond(400, [
            'error' => 'JSON INVALIDO'
        ]);
    }

    $email = trim($input['email'] ?? '');
    $password = trim($input['password'] ?? '');

    //VALIDACIONES
    if(!is_string($email) || !is_string($password)){
        respond(400, [
            'error' => 'Datos invalidos'
        ]);
    }
    if (
        strlen($email) > 255 ||
        !filter_var($email, FILTER_VALIDATE_EMAIL)
    ) {
        respond(422, [
            'error' => 'Correo inválido'
        ]);
    }

    if (
        strlen($password) < 8 ||
        strlen($password) > 72
    ) {
        respond(422, [
            'error' => 'La contraseña debe tener entre 8 y 72 bytes'
        ]);
    }

    $sql = '
        INSERT INTO users (email, password)
        VALUES (:email, :password)
        RETURNING id, email, created_at
    ';

    $stmt = $pdo->prepare($sql);

    $stmt -> execute([
        'email' => $email,
        'password' => $password
    ]);

    $user = $stmt -> fetch();

    respond(201, [
        'message' => 'USUARIO REGISTRADO',
        'user' => $user
    ]);
} catch (PDOException $e) {
    error_log($e->getMessage());

    respond(500, [
        'error' => 'Error interno del servidor'
    ]);
}