<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, x-xsrf-token");

$con=mysqli_connect("localhost","root","","db_persib");

if (mysqli_connect_errno()) {
  echo "Failed to connect to MySQL: " . mysqli_connect_error();
}

$data = json_decode(file_get_contents("php://input"));
$member_nama = mysqli_real_escape_string($con, $data->member_nama);
$member_alamat = mysqli_real_escape_string($con, $data->member_alamat);
$member_telp = mysqli_real_escape_string($con, $data->member_telp);
$member_tgl_masuk = mysqli_real_escape_string($con, $data->member_tgl_masuk);


$sql = "INSERT INTO member(member_nama, member_alamat, member_telp, member_tgl_masuk) values ('$member_nama','$member_alamat', '$member_telp', '$member_tgl_masuk')";

if (!mysqli_query($con, $sql)) {
  die('Error: ' . mysqli_error($con));
}
echo "1 record added";

mysqli_close($conn);
?>