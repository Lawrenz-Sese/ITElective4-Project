<?php 
	require_once("./config/Config.php");

	$db = new Connection();
	$pdo = $db->connect();
	$gm = new GlobalMethods($pdo);
	$post = new Post($pdo);
	$get = new Get($pdo);
	$auth = new Auth($pdo);

	if (isset($_REQUEST['request'])) {
		$req = explode('/', rtrim($_REQUEST['request'], '/'));
	} else {
		$req = array("errorcatcher");
	}

	switch($_SERVER['REQUEST_METHOD']) {
		case 'POST':

			

			switch($req[0]) {
				// PULL DATA OF products table
				case 'products':
					if(count($req)>1) {
						echo json_encode($get->pullProducts($req[1]), JSON_PRETTY_PRINT);
					} else {
						echo json_encode($get->pullProducts(null), JSON_PRETTY_PRINT);
					}
				break;

				case 'users':
					if(count($req)>1) {
						echo json_encode($get->pullUser($req[1]), JSON_PRETTY_PRINT);
					} else {
						echo json_encode($get->pullUser(null), JSON_PRETTY_PRINT);
					}
				break;

				case 'cart':
					if(count($req)>1) {
						echo json_encode($get->pullCart($req[1]), JSON_PRETTY_PRINT);
					} else {
						echo json_encode($get->pullCart(null), JSON_PRETTY_PRINT);
					}
				break;

				case 'addProduct':
					$d = json_decode(base64_decode(file_get_contents("php://input")));
					echo json_encode($gm->insert("tbl_products",$d), JSON_PRETTY_PRINT);
				break;

				case 'addCart':
					$d = json_decode(base64_decode(file_get_contents("php://input")));
					echo json_encode($gm->insert("tbl_cart",$d), JSON_PRETTY_PRINT);
				break;

				case 'delProduct':
					$d = json_decode(base64_decode(file_get_contents("php://input")));
					echo json_encode($post->delProduct($d), JSON_PRETTY_PRINT);
				break;

				case 'delCarts':
					$d = json_decode(base64_decode(file_get_contents("php://input")));
					echo json_encode($post->delCarts($d), JSON_PRETTY_PRINT);
				break;

				case 'regUser':
					$d = json_decode(base64_decode(file_get_contents("php://input")));
					echo json_encode($auth->regUser($d), JSON_PRETTY_PRINT);
				break;
			}
		break;

		case 'GET':
			switch ($req[0]) {

				default:
				http_response_code(400);
				echo "Bad Request";
				break;
			}
		break;

		default:
			http_response_code(403);
			echo "Please contact the Systems Administrator";
		break;
	}
?>