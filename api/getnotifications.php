<?php 
    session_start();
    include 'connectvars.php';
    header('Content-type: application/json');   

    $conn = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);
    if (!$conn) {
        http_response_code(500);
        die('Could not connect' . mysqli_error());
    }

	 $username = "";

	if (!isset($_SESSION["username"])) {
		$username = $_GET['username'];
	} else {
		$username = $_SESSION["username"];
	}

	 $query = "SELECT eName, eDesc, gName FROM NotificationList WHERE username='$username'";
    $result = $conn->query($query);
    if (!$result) {
        http_response_code(500);
        die('Error with query.');
    }


	 $requestArray = array();
	 while($row = $result->fetch_array(MYSQL_ASSOC)) {
	 	$requestArray[] = $row;
	 }

    echo json_encode($requestArray, JSON_NUMERIC_CHECK);
    $conn->close();
?>
