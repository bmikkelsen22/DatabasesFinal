<?php 
    session_start();
    include 'connectvars.php';
    header('Content-type: application/json');   

    $conn = new mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);
    if (!$conn) {
        http_response_code(500);
        die('Could not connect' . mysqli_error());
    }

	 $gid = $_GET['gid'];
	 $query = "SELECT * FROM Requests WHERE gID='$gid'";

    $result = $conn->query($query);
    if (!$result) {
        http_response_code(500);
        die('Error with query.');
    }

	 if ($result->num_rows == 0) {
	 	http_response_code(400);
		die("No existant Requests.");
	 }

	 $notificationArray = array();
	 while($row = $result->fetch_array(MYSQL_ASSOC)) {
	 	$notificationArray[] = $row;
	 }

    echo json_encode($notificationArray, JSON_NUMERIC_CHECK);
    $conn->close();
?>
