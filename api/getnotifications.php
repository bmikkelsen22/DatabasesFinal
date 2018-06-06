<?php 
    session_start();
    include 'connectvars.php';
    header('Content-type: application/json');   

    $conn = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);
    if (!$conn) {
        http_response_code(500);
        die('Could not connect' . mysqli_error());
    }

    if (isset($_SESSION["username"])) {
        $query = 'SELECT N.nMessage, U.firstName, U.lastName
        FROM Notifications N, Users U
        WHERE N.nReceiver = ' . $_SESSION['username'] . ' AND U.username = N.nSender';
    }

    $result = $conn->query($query);
    if (!$result) {
        http_response_code(500);
        die('Error with query.');
    }


	 $notificationArray = array();
	 while($row = $result->fetch_array(MYSQL_ASSOC)) {
	 	$notificationArray[] = $row;
	 }

    echo json_encode($notificationArray, JSON_NUMERIC_CHECK);
    $conn->close();
?>
