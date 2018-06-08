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
		$username = $_SESSION["username"];
	} else {
		$username = $_GET['username'];
	}

	if (!$username || $username == "") {
		http_response_code(500);
		die('Invalid username.');
	}

	 $query = "SELECT G.gID, G.gDesc, G.gName FROM Groups G, Membership M WHERE M.gID = G.gID AND M.username='$username'";
    $result = $conn->query($query);
    if (!$result) {
        http_response_code(500);
        die('Error with query.');
    }


	 $groupArray = array();
	 while($row = $result->fetch_array(MYSQL_ASSOC)) {
	 	$groupArray[] = $row;
	 }

    echo json_encode($groupArray, JSON_NUMERIC_CHECK);
    $conn->close();
?>
