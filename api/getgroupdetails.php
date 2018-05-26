<?php
include 'connectvars.php'; 
header('Content-type: application/json');
$conn = new mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);
if (!$conn) {
  http_response_code(500);
  die("Error connecting to database");
}

//group details
$gid = $_GET['gid'];
$query = "SELECT * FROM Groups WHERE gID = '$gid'";

$result = $conn->query($query);
if (!$result) {
  http_response_code(500);
  die("Error executing query");
}

if ($result->num_rows != 1) {
  http_response_code(400);
  die("Invalid gID");
}
$jsonResult = $result->fetch_array(MYSQL_ASSOC);

//members
$query = "SELECT Users.username, Users.firstName, Users.lastName, Users.email FROM Users, Membership WHERE Users.username = Membership.username AND Membership.gID = '$gid'";

$result = $conn->query($query);
if (!$result) {
  http_response_code(500);
  die("Error executing query");
}

$membersArray = array();
while($row = $result->fetch_array(MYSQL_ASSOC)) {
  $membersArray[] = $row;
}
$jsonResult["members"] = $membersArray;

echo json_encode($jsonResult, JSON_NUMERIC_CHECK);
$conn->close();
?>