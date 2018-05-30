<?php
include 'connectvars.php';

$conn = new mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);
if ($conn->connect_error) {
  http_response_code(500);
  die("Error connecting to database");
}

//get next eID
$query = "SELECT MAX(eID) + 1 AS nextEid FROM Expenses";

$eidRes = $conn->query($query)->fetch_array(MYSQL_ASSOC);
$nextEid = $eidRes['nextEid'];

//load and check json payload
$json = json_decode($_POST['json']);
$eName = $json['eName'];
$eDesc = $json['eDesc'];
$eCost = $json['eCostTotal'];
$eNumUsers = $json['eNumUsers'];
$gID = $json['gID'];

//insert expense
$query = "INSERT INTO Expenses (eName, eDesc, eID, eCostTotal, eNumUsers, gID) VALUES ($eName, $eDesc, $nextEid, $eCost, $eNumUsers, $gID)";

if ($conn->query($query) !== TRUE) {
  http_response_code(500);
  die("Error adding expense");
}

//insert expensePaid

$query = "INSERT INTO ExpensesPaid (eID, username, pPaid) VALUES ";
for ($i = 0; $i < count($json['users']); $i++) {
  $user = $json['users'][$i];

  $username = $user['username'];
  $pPaid = $user['pPaid'];

  $query .= "($nextEid, $username, $pPaid)";
  if ($i < count($json['users']) - 1) {
    $query .= ", ";
  }
}

if ($conn->query($query) !== TRUE) {
  http_response_code(500);
  die("Error adding expensesPaid");
}

echo("Added expense");
?>