<?php 
$app->get('/session', function() {
    $db = new DbHandler();
    $session = $db->getSession();
    $response["admin_nama"] = $session['admin_nama'];
    echoResponse(200, $session);
});

$app->post('/login', function() use ($app) {
    require_once 'passwordHash.php';
    $r = json_decode($app->request->getBody());
    verifyRequiredParams(array('username', 'password'),$r->customer);
    $response = array();
    $db = new DbHandler();
    $password = $r->customer->password;
    $username = $r->customer->username;
	
    $user = $db->getOneRecord("select admin_id,admin_nama,admin_password,admin_alamat,admin_telp from t_admin where admin_nama='$username'");
    if ($user != NULL) {
        if(passwordHash::check_password($user['password'],$password)){
        $response['status'] = "success";
        $response['message'] = 'Anda Berhasil Login';
        $response["admin_nama"] = $user['admin_nama'];
        if (!isset($_SESSION)) {
            session_start();
        }
        $_SESSION['admin_nama'] = $user['admin_nama'];
        } else {
            $response['status'] = "error";
            $response['message'] = 'Username dan Password Salah';
        }
    }else {
            $response['status'] = "error";
            $response['message'] = 'No such user is registered';
        }
    echoResponse(200, $response);
});
$app->get('/logout', function() {
    $db = new DbHandler();
    $session = $db->destroySession();
    $response["status"] = "info";
    $response["message"] = "Anda Telah Logout";
    echoResponse(200, $response);
});
?>