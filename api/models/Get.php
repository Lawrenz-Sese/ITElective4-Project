<?php


class Get{
    protected $gm, $pdo;

    public function __construct(\PDO $pdo) {
        $this->pdo = $pdo;
        $this->gm = new GlobalMethods($pdo);
    }


    public function pullProducts($filterData){
        $code = 401;
        $payload = null;
        $remarks = "failed";
        $message = "Unable to retrieve data";

        $sql = "SELECT * FROM tbl_products";

        if($filterData!=null){
            $sql.=" WHERE pid=".$filterData;
        }

        $res = $this->gm->generalQuery($sql);

        if($res['code']==200) {
            $code = 200;
            $payload = $res['data'];
            $remarks = "success";
            $message = "Successfully retrieved data";
        }
        return $this->gm->sendPayload($payload, $remarks, $message, $code);
    }

    public function pullUser($filterData){
        $code = 401;
        $payload = null;
        $remarks = "failed";
        $message = "Unable to retrieve data";

        $sql = "SELECT * FROM tbl_user";

        if($filterData!=null){
            $sql.=" WHERE user_id=".$filterData;
        }

        $res = $this->gm->generalQuery($sql);

        if($res['code']==200) {
            $code = 200;
            $payload = $res['data'];
            $remarks = "success";
            $message = "Successfully retrieved data";
        }
        return $this->gm->sendPayload($payload, $remarks, $message, $code);
    }


}
?>