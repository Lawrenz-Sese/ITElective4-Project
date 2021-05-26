<?php


class Post{
    protected $gm, $pdo, $get;

    public function __construct(\PDO $pdo) {
        $this->pdo = $pdo;
        $this->gm = new GlobalMethods($pdo);
        $this->get = new Get($pdo);
    }

// ADD PRODUCT
    public function addProduct($data) {

        $code = 401;
        $payload = null;
        $remarks = "failed";
        $message = "Unable to retrieve data";
        $prodInfo = $data->prodInfo;

        $res = $this->gm->insert('tbl_products', $prodInfo);

        if($res['code']==200) {
            $code = 200;
            $payload = $res['data'];
            $remarks = "success";
            $message = "Successfully retrieved data";
            return $this->get->pullProducts(null);
        }
        return $this->gm->sendPayload($payload, $remarks, $message, $code);
    }
//ADD TO CART
    public function addCart($data) {

        $code = 401;
        $payload = null;
        $remarks = "failed";
        $message = "Unable to retrieve data";
        $prodInfo = $data->prodInfo;

        $res = $this->gm->insert('tbl_cart', $prodInfo);

        if($res['code']==200) {
            $code = 200;
            $payload = $res['data'];
            $remarks = "success";
            $message = "Successfully retrieved data";
            return $this->get->pullCart(null);
        }
        return $this->gm->sendPayload($payload, $remarks, $message, $code);
      
    }

    //CHECK OUT
    public function addCheck($data) {

        $code = 401;
        $payload = null;
        $remarks = "failed";
        $message = "Unable to retrieve data";
        $checkInfo = $data->checkInfo;
    

        $res = $this->gm->insert('tbl_checkout', $checkInfo);

        
        if($res['code']==200) {
            $code = 200;
            $payload = $res['data'];
            $remarks = "success";
            $message = "Successfully retrieved data";
            // return $this->get->pullCart(null);
        }
        
        return $this->gm->sendPayload($payload, $remarks, $message, $code);
      
    }
// //DELETE PRODUCT
//     public function delProduct($data) {

//         $code = 401;
//         $payload = null;
//         $remarks = "failed";
//         $message = "Unable to retrieve data";
//         $conditionString = "pid=".$data->pid;
  
//         $res = $this->gm->delete('tbl_products', $data, $conditionString);

//         if($res['code']==200) {
//             $code = 200;
//             $payload = $res;
//             $remarks = "success";
//             $message = "Successfully retrieved data";
//             return $this->get->pullProducts(null);
//         }
//         return $this->gm->sendPayload($payload, $remarks, $message, $code);
//     }

    public function delCarts($d) {
        $data = $d;
        $cart_id = $data->cart_id;
        $res = $this->gm->delete('tbl_cart', $data, "cart_id = '$cart_id'");
        if ($res['code'] == 200) {
			$payload = $res['data'];
			$remarks = "success";
			$message = "Successfully retrieved requested data";
		} else {
			$payload = null;
			$remarks = "failed";
			$message = $res['errmsg'];
		}
    }

    public function delProduct($d) {
        $data = $d;
        $pid = $data->pid;
        $res = $this->gm->delete('tbl_products', $data, "pid = '$pid'");
        if ($res['code'] == 200) {
			$payload = $res['data'];
			$remarks = "success";
			$message = "Successfully retrieved requested data";
		} else {
			$payload = null;
			$remarks = "failed";
			$message = $res['errmsg'];
		}
    }





    


    
}
