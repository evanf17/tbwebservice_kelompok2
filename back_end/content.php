<?php 
if($_GET['page']=='home'){
	include "system/home.php";
}
elseif ($_GET['page']=='berita') {
	include "system/berita.php";
}
elseif ($_GET['page']=='member') {
	include "system/member.php";
}
elseif ($_GET['page']=='jadwal') {
	include "system/jadwal.php";
}
?>