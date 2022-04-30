<?php // 查詢

include("connection.php");

//---------------------------------------------------
$member = json_decode(file_get_contents("php://input"), true);
// echo json_encode($member);

//建立SQL
$sql = "SELECT * FROM member where id= :id";

$statement = $link->prepare($sql);

$statement->bindValue(":id", $member["login"]);

// 執行
$statement->execute();
$data = $statement->fetchAll();
$resultCount = $statement->rowCount();

if ($resultCount > 0) {
    $respBody["id"] = $data[0]["id"];
    // $respBody["id"] = $data[0]["id"];
    $respBody["successful"] = true;
    // echo json_encode($respBody);
} else {
    $respBody["successful"] = false;
}

echo json_encode($respBody);
