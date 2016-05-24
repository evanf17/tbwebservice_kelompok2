<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, x-xsrf-token");

$con=mysqli_connect("localhost","root","","db_persib");

if (mysqli_connect_errno()) {
  echo "Failed to connect to MySQL: " . mysqli_connect_error();
}
   
$data = json_decode(file_get_contents("php://input"));

$berita_id = mysqli_real_escape_string($con, $data->berita_id);
$berita_deskripsi = mysqli_real_escape_string($con, $data->berita_deskripsi);
$jadwal_id = mysqli_real_escape_string($con, $data->jadwal_id);

$sql = "update berita set berita_deskripsi='$berita_deskripsi', jadwal_id='$jadwal_id' where berita_id ='$berita_id'";

if (!mysqli_query($con, $sql)) {
  die('Error: ' . mysqli_error($con));
}
echo "1 record update";

mysqli_close($conn);
 
?>