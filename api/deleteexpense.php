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

$query = "DELETE FROM ExpensesPaid WHERE eID = '$eid'";

if ($conn->query($query) !== TRUE) {
  http_response_code(500);
  die("Error deleting: $query");
}

$query = "DELETE FROM Expenses WHERE eID = '$eid'";

if ($conn->query($query) !== TRUE) {
  http_response_code(500);
  die("Error deleting: $query");
}

echo("Deleted");
?>