<?php
session_start();
include 'connectvars.php'; 
$conn = new mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);
if ($conn->connect_error) {
  http_response_code(500);
  die("Error connecting to database");
}

//group details
$eid = $_GET['eid'];
$username = $_GET['username'];
$query = "UPDATE ExpensesPaid SET pPaid = 1 WHERE eID = '$eid' AND username = '$username'";

if ($conn->query($query) !== TRUE) {
  http_response_code(500);
  die("Error marking paid");
}

echo("Marked paid");
?>