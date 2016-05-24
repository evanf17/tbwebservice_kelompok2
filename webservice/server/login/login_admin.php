<?php
 
if (isset($_SERVER['HTTP_ORIGIN'])) {
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400');
}
 
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
 
    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
        header("Access-Control-Allow-Methods: GET");
 
    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
        header("Access-Control-Allow-Headers:{$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
    exit(0);
}
 
$db_name  = 'db_persib';
$hostname = 'localhost';
$username = 'root';
$password = '';

$pdo = new PDO("mysql:host=$hostname;dbname=$db_name", $username, $password);
switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        $user = $_REQUEST['user'];
        $pass = $_REQUEST['pass'];
        $query_params = array(
            ':user' => $user,
            ':pass' => $pass
        );
        $st = $pdo->prepare("SELECT * FROM admin where admin_nama=:user and admin_password=(md5(:pass))");
        $result = $st->execute($query_params);
        echo json_encode($st->fetchAll(PDO::FETCH_ASSOC));
        break;
}