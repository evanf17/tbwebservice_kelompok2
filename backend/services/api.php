<?php
 	require_once("Rest.inc.php");
	
	class API extends REST {
	
		public $data = "";
		
		const DB_SERVER = "127.0.0.1";
		const DB_USER = "root";
		const DB_PASSWORD = "";
		const DB = "db_persib";

		private $db = NULL;
		private $mysqli = NULL;
		public function __construct(){
			parent::__construct();				// Init parent contructor
			$this->dbConnect();					// Initiate Database connection
		}
		
		/*
		 *  Connect to Database
		*/
		private function dbConnect(){
			$this->mysqli = new mysqli(self::DB_SERVER, self::DB_USER, self::DB_PASSWORD, self::DB);
		}
		
		/*
		 * Dynmically call the method based on the query string
		 */
		public function processApi(){
			$func = strtolower(trim(str_replace("/","",$_REQUEST['x'])));
			if((int)method_exists($this,$func) > 0)
				$this->$func();
			else
				$this->response('',404); // If the method not exist with in this class "Page not found".
		}
				
		private function login(){
			if($this->get_request_method() != "POST"){
				$this->response('',406);
			}
			$admin_username = $this->_request['admin_username'];		
			$admin_password = $this->_request['admin_password'];
			if(!empty($admin_username) and !empty($admin_password)){
				if(filter_var($admin_username, FILTER_VALIDATE_EMAIL)){
					$query="SELECT admin_id, admin_username, admin_password FROM t_admin WHERE admin_username = '$admin_username' AND password = '".md5($admin_password)."' LIMIT 1";
					$r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);

					if($r->num_rows > 0) {
						$result = $r->fetch_assoc();	
						// If success everythig is good send header as "OK" and user details
						$this->response($this->json($result), 200);
					}
					$this->response('', 204);	// If no records "No Content" status
				}
			}
			
			$error = array('status' => "Failed", "msg" => "Invalid Username or Password");
			$this->response($this->json($error), 400);
		}
		
		private function admins(){	
			if($this->get_request_method() != "GET"){
				$this->response('',406);
			}
			$query="SELECT distinct a.admin_id, a.admin_nama, a.admin_username, a.admin_password, a.admin_alamat, a.admin_telp  FROM t_admin a order by a.admin_nama desc";
			$r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);

			if($r->num_rows > 0){
				$result = array();
				while($row = $r->fetch_assoc()){
					$result[] = $row;
				}
				$this->response($this->json($result), 200); // send user details
			}
			$this->response('',204);	// If no records "No Content" status
		}
		private function admin(){	
			if($this->get_request_method() != "GET"){
				$this->response('',406);
			}
			$id = (int)$this->_request['id'];
			if($id > 0){	
				$query="SELECT distinct a.admin_id, a.admin_nama, a.admin_username, a.admin_password, a.admin_alamat, a.admin_telp  FROM t_admin a where a.admin_id=$id";
				$r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
				if($r->num_rows > 0) {
					$result = $r->fetch_assoc();	
					$this->response($this->json($result), 200); // send user details
				}
			}
			$this->response('',204);	// If no records "No Content" status
		}
		
		private function insertAdmin(){
			if($this->get_request_method() != "POST"){
				$this->response('',406);
			}

			$admin = json_decode(file_get_contents("php://input"),true);
			$column_names = array('admin_nama', 'admin_username', 'admin_password', 'admin_alamat', 'admin_telp');
			$keys = array_keys($admin);
			$columns = '';
			$values = '';
			foreach($column_names as $desired_key){ // Check the admin received. If blank insert blank into the array.
			   if(!in_array($desired_key, $keys)) {
			   		$$desired_key = '';
				}else{
					$$desired_key = $admin[$desired_key];
				}
				$columns = $columns.$desired_key.',';
				$values = $values."'".$$desired_key."',";
			}
			$query = "INSERT INTO t_admin(".trim($columns,',').") VALUES(".trim($values,',').")";
			if(!empty($admin)){
				$r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
				$success = array('status' => "Success", "msg" => "Admin Created Successfully.", "data" => $admin);
				$this->response($this->json($success),200);
			}else
				$this->response('',204);	//"No Content" status
		}
		private function updateAdmin(){
			if($this->get_request_method() != "POST"){
				$this->response('',406);
			}
			$admin = json_decode(file_get_contents("php://input"),true);
			$id = (int)$admin['id'];
			$column_names = array('admin_nama', 'admin_username', 'admin_password', 'admin_alamat', 'admin_telp');
			$keys = array_keys($admin['admin']);
			$columns = '';
			$values = '';
			foreach($column_names as $desired_key){ // Check the admin received. If key does not exist, insert blank into the array.
			   if(!in_array($desired_key, $keys)) {
			   		$$desired_key = '';
				}else{
					$$desired_key = $admin['admin'][$desired_key];
				}
				$columns = $columns.$desired_key."='".$$desired_key."',";
			}
			$query = "UPDATE t_admin SET ".trim($columns,',')." WHERE admin_id=$id";
			if(!empty($admin)){
				$r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
				$success = array('status' => "Success", "msg" => "Admin ".$id." Updated Successfully.", "data" => $admin);
				$this->response($this->json($success),200);
			}else
				$this->response('',204);	// "No Content" status
		}
		
		private function deleteAdmin(){
			if($this->get_request_method() != "DELETE"){
				$this->response('',406);
			}
			$id = (int)$this->_request['id'];
			if($id > 0){				
				$query="DELETE FROM t_admin WHERE admin_id = $id";
				$r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
				$success = array('status' => "Success", "msg" => "Successfully deleted one record.");
				$this->response($this->json($success),200);
			}else
				$this->response('',204);	// If no records "No Content" status
		}
		
		//MEMBER
		private function members(){	
			if($this->get_request_method() != "GET"){
				$this->response('',406);
			}
			$query="SELECT distinct m.member_id, m.member_nama, m.member_password, m.admin_alamat, m.admin_telp, m.member_tgl_masuk  FROM member m order by m.member_nama asc";
			$r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);

			if($r->num_rows > 0){
				$result = array();
				while($row = $r->fetch_assoc()){
					$result[] = $row;
				}
				$this->response($this->json($result), 200); // send user details
			}
			$this->response('',204);	// If no records "No Content" status
		}
		private function member(){	
			if($this->get_request_method() != "GET"){
				$this->response('',406);
			}
			$id = (int)$this->_request['id'];
			if($id > 0){	
				$query="SELECT distinct m.member_id, m.member_nama, m.member_password, m.member_alamat, m.member_telp, m.member_tgl_masuk  FROM member a where m.member_id=$id";
				$r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
				if($r->num_rows > 0) {
					$result = $r->fetch_assoc();	
					$this->response($this->json($result), 200); // send user details
				}
			}
			$this->response('',204);	// If no records "No Content" status
		}
		
		private function insertMember(){
			if($this->get_request_method() != "POST"){
				$this->response('',406);
			}

			$member = json_decode(file_get_contents("php://input"),true);
			$column_names = array('member_nama', 'member_password', 'member_alamat', 'member_telp', 'member_tgl_masuk');
			$keys = array_keys($member);
			$columns = '';
			$values = '';
			foreach($column_names as $desired_key){ // Check the admin received. If blank insert blank into the array.
			   if(!in_array($desired_key, $keys)) {
			   		$$desired_key = '';
				}else{
					$$desired_key = $member[$desired_key];
				}
				$columns = $columns.$desired_key.',';
				$values = $values."'".$$desired_key."',";
			}
			$query = "INSERT INTO member(".trim($columns,',').") VALUES(".trim($values,',').")";
			if(!empty($member)){
				$r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
				$success = array('status' => "Success", "msg" => "Member Created Successfully.", "data" => $member);
				$this->response($this->json($success),200);
			}else
				$this->response('',204);	//"No Content" status
		}
		private function updateMember(){
			if($this->get_request_method() != "POST"){
				$this->response('',406);
			}
			$member = json_decode(file_get_contents("php://input"),true);
			$id = (int)$member['id'];
			$column_names = array('member_nama', 'member_password', 'member_alamat', 'member_telp', 'member_tgl_masuk');
			$keys = array_keys($member['member']);
			$columns = '';
			$values = '';
			foreach($column_names as $desired_key){ // Check the admin received. If key does not exist, insert blank into the array.
			   if(!in_array($desired_key, $keys)) {
			   		$$desired_key = '';
				}else{
					$$desired_key = $member['member'][$desired_key];
				}
				$columns = $columns.$desired_key."='".$$desired_key."',";
			}
			$query = "UPDATE member SET ".trim($columns,',')." WHERE member_id=$id";
			if(!empty($member)){
				$r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
				$success = array('status' => "Success", "msg" => "Member ".$id." Updated Successfully.", "data" => $member);
				$this->response($this->json($success),200);
			}else
				$this->response('',204);	// "No Content" status
		}
		
		private function deleteMember(){
			if($this->get_request_method() != "DELETE"){
				$this->response('',406);
			}
			$id = (int)$this->_request['id'];
			if($id > 0){				
				$query="DELETE FROM member WHERE member_id = $id";
				$r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
				$success = array('status' => "Success", "msg" => "Successfully deleted one record.");
				$this->response($this->json($success),200);
			}else
				$this->response('',204);	// If no records "No Content" status
		}
		/*
		 *	Encode array into JSON
		*/
		private function json($data){
			if(is_array($data)){
				return json_encode($data);
			}
		}
	}
	
	// Initiiate Library
	
	$api = new API;
	$api->processApi();
?>