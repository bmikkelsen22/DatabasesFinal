<?php
	session_start();
	include 'connectvars.php';


	error_reporting(E_ALL);
	$conn = new mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);

	if (!$conn) {
		http_response_code(500);
		die("Error connecting to database" . mysqli_error());
	}

	$jsonStr = file_get_contents('php://input');

	$json = json_decode($jsonStr, TRUE);
	$username = $json['username'];
	$gID = $json['gID'];

	$query = "DELETE FROM Membership WHERE username='$username' AND gID=$gID";

	if (!$conn->query($query)) {
		http_response_code(500);
		die("Error Deleting User: \n$query");
	}

	echo("$username Removed");
?>
