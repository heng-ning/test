<?php // 註冊
include("connection.php");
//---------------------------------------------------
$member = json_decode(file_get_contents("php://input"), true);
// echo json_encode($member);

//建立SQL
$sql = "insert into member(id,name,isTrue,kind)
values (:id,:name,:isTrue,'');";


$statement = $link->prepare($sql);

$statement->bindValue(":id", $member["id"]);
$statement->bindValue(":name", $member["name"]);
$statement->bindValue(":isTrue", $member["isTrue"]);
$statement->bindValue(":kind", $member["kind"]);


 //執行
$statement->execute();
echo "新增成功!";

?>
