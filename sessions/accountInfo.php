<?php
		session_start();
		$username = $_SESSION["username"];

		$currentpage="List Users";
		include "pages.php";
?>

<!DOCTYPE html>

<html>
	<head>
		<title>List Users</title>
		<link rel="stylesheet" href="css/style.css">
		<link rel="stylesheet" href="css/unify.css">
	</head>
<body>


<?php
// change the value of $dbuser and $dbpass to your username and password
	include 'connectvars.php'; 
	include "header.php";
	$msg = "User Info";
	echo "<div class='page-content'>";

// change the value of $dbuser and $dbpass to your username and password
	
$conn = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);
	if (!$conn) {
		die('Could not connect: ' . mysql_error());
	}	

	// CHeck if user has card info
	// $query = "SELECT * FROM PaymentInfo P WHERE P.username = '$username' ";
	// $result = mysqli_query($conn, $query);
	// if (!$result) {
	// 	$sql = "INSERT INTO PaymentInfo (pCardNum, username, pAddress, pCity, pState, pZip) VALUES ('', (SELECT username FROM Users WHERE username='$username'), '', '', '', '')";
	// }

	// query to select all information from supplier table
	// $query = "SELECT U.username, U.firstName, U.lastName, U.email, P.pCardNum, P.pAddress, P.pCity, P.pZip, P.pState FROM Users U, PaymentInfo P WHERE U.username = '$username' AND P.username = '$username' ";

	$query = "SELECT U.username, U.firstName, U.lastName, U.email FROM Users U WHERE U.username = '$username' ";

// Get results from query
	$result = mysqli_query($conn, $query);
	if (!$result) {
		die("Query to show fields from table failed");
	}
// get number of columns in table	
	$fields_num = mysqli_num_fields($result);
	echo "<table id='t01' border='1'><tr>";
	
// printing table headers
	$count = 1;
	$saltColumn = 0;
	for($i=0; $i<$fields_num; $i++) {	
		$field = mysqli_fetch_field($result);
		echo "<td><b>$field->name</b></td>";
	}
	echo "</tr>\n";

		 $row = mysqli_fetch_row($result);
		 echo "<tr>";		
		 $count = 0;
		 $firstName = $row[1];
		 $lastName = $row[2];
		 $email = $row[3];
		 $cardNum = $row[4];
		 $address = $row[5];
		 $city = $row[6];
		 $zip = $row[7];
		 $state = $row[8];

		foreach($row as $cell) {	
				echo "<td>$cell</td>";
			$count++;	
		}
		echo "</tr>\n";
	

	if ($_SERVER["REQUEST_METHOD"] == "POST") {

		if (mysqli_real_escape_string($conn, $_POST['firstName'] != "")) {
		 	$firstName = mysqli_real_escape_string($conn, $_POST['firstName']);
		}

		if (mysqli_real_escape_string($conn, $_POST['lastName'] != "")) {
		 	$lastName = mysqli_real_escape_string($conn, $_POST['lastName']);
		}

		if (mysqli_real_escape_string($conn, $_POST['email'] != "")) {
		 	$email = mysqli_real_escape_string($conn, $_POST['email']);
		}

		if (mysqli_real_escape_string($conn, $_POST['cardNum'] != "")) {
		 	$cardNum = mysqli_real_escape_string($conn, $_POST['cardNum']);
		}

		if (mysqli_real_escape_string($conn, $_POST['address'] != "")) {
		 	$address = mysqli_real_escape_string($conn, $_POST['address']);
		}

		if (mysqli_real_escape_string($conn, $_POST['city'] != "")) {
		 	$city = mysqli_real_escape_string($conn, $_POST['city']);
		}

		if (mysqli_real_escape_string($conn, $_POST['zip'] != "")) {
		 	$zip = mysqli_real_escape_string($conn, $_POST['zip']);
		}

		if (mysqli_real_escape_string($conn, $_POST['state'] != "")) {
		 	$state = mysqli_real_escape_string($conn, $_POST['state']);
		}

		$sql = "UPDATE Users SET firstName='$firstName', lastName='$lastName', email='$email' WHERE username='$username' ";
		$result = mysqli_query($conn, $sql);
	}


	mysqli_free_result($result);
	mysqli_close($conn);
?>
	<section>
    <h2> <?php echo $msg; ?> </h2>
<form class="signup-form" id="updateForm" name="updateForm" method="post">
		  <?php echo "Welcome $username!"; ?><br />
		  <input type="email" class="input" value="<?php echo $email; ?>" id="email" name="email" autocomplete="off" placeholder="Email"><br />
          <input type="text" class="input" value="<?php echo $firstName; ?>" id="firstName" name="firstName" autocomplete="off" placeholder="First Name"><br />
          <input type="text" class="input" value="<?php echo $lastName; ?>" id="lastName" name="lastName" autocomplete="off" placeholder="Last Name"><br />
          <input type="text" class="input" value="<?php echo $cardNum; ?>" id="cardNum" name="cardNum" autocomplete="off" placeholder="Card Num"><br />
          <input type="text" class="input" value="<?php echo $address; ?>" id="address" name="address" autocomplete="off" placeholder="Address"><br />
          <input type="text" class="input" value="<?php echo $city; ?>" id="city" name="city" autocomplete="off" placeholder="City"><br />
          <input type="text" class="input" value="<?php echo $zip; ?>" id="zip" name="zip" autocomplete="off" placeholder="Zip"><br />
          <input type="text" class="input" value="<?php echo $state; ?>" id="state" name="state" autocomplete="off" placeholder="State"><br />

		  <input type="submit" class="button" value="Update Info">
</form>

</div>
</body>

</html>

	
