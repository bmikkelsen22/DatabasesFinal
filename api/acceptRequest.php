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
	$gID = $json['gID'];
	$username = $json['username'];

	$query = "INSERT INTO `Membership` (`gID`, `username`, `mAdmin`) VALUES ('$gID','$username','0')";

	if (!$conn->query($query)) {
		http_response_code(500);
		die("Error Adding User: \n$query");
	}

	echo("$username Accepted");
?>
