<?php
	session_start();
	if(!$_SESSION["count"])
		$_SESSION["count"] = 0;
	if(!$_GET["count"] == "yes")
		$_SESSION["count"] = $_SESSION["count"] + 1;
?>


<!DOCTYPE html>


<?php
	$currentpage="List Groups";
	include "pages.php";
?>

<html>
  <head>
	<?php
		include "header.php";
	?>
	<style>
	  <?php
		include "assets/main.css";
	  ?>
	</style>
  	<title>Group Listings</title>
	<link rel="stylesheet" href="css/unify.css">
  </head>


  <body>
	<div class="page-content"> 
	<form action="viewGroups.php" method="post">
      <input type="text" name="search" placeholder="Search for group..">
      <input type="submit" value=">>">
    </form>



<?php
	include "connectvars.php"; 

	$conn = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME) 
		or die('Could not connect: ' . mysql_error());

	$query = "CREATE VIEW GroupsAndMembersInfo AS SELECT Groups.gID, 
		  Groups.gName, Groups.gDesc, Membership.username,
		  Users.firstName, Users.lastName FROM Membership 
 		  INNER JOIN Groups ON Membership.gID=Groups.gID 
                  INNER JOIN Users ON Users.username=Membership.username";
	
	$result = mysqli_query($conn, $query) or die("Query failure");
	
	$query = "SELECT gID, gName, gDesc FROM Groups";
	if(isset($_POST['search'])) {
		$searchVal = $_POST['search'];
		$searchVal = preg_replace("#[^0-9a-z]#i","",$searchVal);

		// Maybe include username in this query?
		$query = "SELECT DISTINCT gID, gName, gDesc 
			  FROM GroupsAndMembersInfo 
		          WHERE gName LIKE '%$searchVal%' 
			  OR username LIKE '%$searchVal%' 
			  OR firstName LIKE '%$searchVal%' 
		 	  OR lastName LIKE '%$searchVal%'";
	} 


	$result = mysqli_query($conn, $query) or 
		die("Query to show fields from table failed");
		
	$fields_num = mysqli_num_fields($result);
	echo "<h1>Groups:</h1>";
	echo "<table id='t01' border='1'><tr>";
	
	for($i=0; $i<$fields_num; $i++) {
		$field = mysqli_fetch_field($result);
		echo "<td><b>$field->name</b></td>";
	}
	echo "<td><b> Status </b></td>";
	echo "</tr>\n";
	
	while($row = mysqli_fetch_row($result)) {
		$temp = $row;
		$temp = array_push($row, "Join Status Goes Here");
		echo "<tr>";
		foreach($row as $cell)	{
			echo "<td>$cell</td>";	
		}
		echo "</tr>\n";
	}

	$query = "DROP VIEW GroupsAndMembersInfo";
	$result = mysqli_query($conn, $query)
		  or die("Query to drop view failed");

	mysqli_free_result($result);
	mysqli_close($conn);
?>
  </div>
  </body>

</html>

<?php
?>


	
