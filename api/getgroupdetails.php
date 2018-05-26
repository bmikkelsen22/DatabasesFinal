<?php
include 'connectvars.php'; 

$conn = new mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);
if (!$conn) {
  http_response_code(500);
  die("Error connecting to database");
}

$gid = $_GET['gid'];
$query = "SELECT * FROM groups WHERE gid = '$gid'";

$result = $conn->query($query);
if (!$result) {
  http_response_code(500);
  die("Error executing query");
}

$jsonResult = array();
while ($row = $result->fetch_array(MYSQL_ASSOC)) {
  $jsonResult[] = $row;
}

echo json_encode($jsonResult, JSON_NUMERIC_CHECK);

?>