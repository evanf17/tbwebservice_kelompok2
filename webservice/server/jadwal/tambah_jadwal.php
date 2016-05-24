<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, x-xsrf-token");

$con=mysqli_connect("localhost","root","","db_persib");

if (mysqli_connect_errno()) {
  echo "Failed to connect to MySQL: " . mysqli_connect_error();
}

$data = json_decode(file_get_contents("php://input"));

$datetime = date("Y-m-d H:i:s");
$waktu = mysqli_real_escape_string($con, $data->waktu);
$lawan_tanding = mysqli_real_escape_string($con, $data->lawan_tanding);
$lokasi_tanding = mysqli_real_escape_string($con, $data->lokasi_tanding);


$sql = "INSERT INTO jadwal(tgl_tanding,waktu,lawan_tanding,lokasi_tanding) values ('$datetime','waktu','lawan_tanding','lokasi_tanding')";

if (!mysqli_query($con, $sql)) {
  die('Error: ' . mysqli_error($con));
}
echo "1 record added";

if (!mysqli_query($con, $sql2)) {
  die('Error: ' . mysqli_error($con));
}
echo "1 record added";

mysqli_close($conn);
?>