<?php
	session_start();
	if(!$_SESSION["count"])
		$_SESSION["count"] = 0;
	if(!$_GET["count"] == "yes")
		$_SESSION["count"] = $_SESSION["count"] + 1;
	//echo "<h1> Welcome, ".$_SESSION["count"]."</h1>";
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
		//include "assets/mockstrap.css";
		include "assets/modalstuff.css";
	  ?>

	
	</style>
	<link rel="stylesheet" href="./css/unify.css">
  	<title>Group Listings</title>
  </head>


  <body>

   <div class="page-content">
    <form action='viewGroups.php' method='post'>
      <input type='text' name='search' placeholder='Search for group..'>
      <input type='submit' value='SEARCH'>
    </form>

    <button id='createGroup'>Create a New Group</button>
    <div id='createGroupModal' class='modal'>
      <div class='modal-content'>
      <span class='close'>&times;</span>
          <p>Enter group information below:</p>
          <form action='viewGroups.php' method='post' name='newgroupform'>
   	      <input type='text' name='groupName' placeholder='Enter a group name'>
   	      <input type='text' name='groupDesc' placeholder='Enter a group description'>
              <input type='submit' value='CREATE'>
          </form>
      </div>
    </div>

    <button id='applyGroup'>Apply to a Group</button>
    <div id='applyGroupModal' class='modal'>
      <div class='modal-content'>
      <span class='close'>&times;</span>
          <p>Enter name of group to apply to:</p>
          <form action='viewGroups.php' method='post' name='newgroupform'>
   	      <input type='text' name='applyName' placeholder='Group Name'>
   	      <input type='text' name='applyMessage' placeholder='Enter a message'>
              <input type='submit' value='APPLY'>
          </form>
      </div>
    </div>


   
<?php
	include "connectvars.php"; 

	$conn = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME) 
		or die('Could not connect: ' . mysql_error());

	if(isset($_POST['groupName'])) {
		$nameVal = $_POST['groupName'];
		$descVal = $_POST['groupDesc'];
		$max = "SELECT MAX(gID) AS maxID FROM Groups";
		$maxResult = mysqli_query($conn, $max) or die("Max query failed.");
		$val = mysqli_fetch_array($maxResult);
		$newMax = $val["maxID"]+1;
		$insertQuery = "INSERT INTO Groups (gID, gName, gDesc)
				VALUES ($newMax, '$nameVal', '$descVal')" ;
		$insertResult = mysqli_query($conn, $insertQuery)
				or die("Insert query failed");
		$sessionUser = $_SESSION['username'];
		$insertAdmin = "INSERT INTO Membership (gID, username, mAdmin)
				VALUES ($newMax, '$sessionUser', 1)";
                $adminResult = mysqli_query($conn, $insertAdmin)
			       or die("Changing admin permissions failed.");
		$_POST = array();
	}



	if(isset($_POST['applyName'])) {
		$applyNameVal = $_POST['applyName'];
		$applyMsgVal = $_POST['applyMessage'];
		$max = "SELECT MAX(rID) AS maxID FROM Requests";
		$maxResult = mysqli_query($conn, $max) or die("Max query failed.");
		$val = mysqli_fetch_array($maxResult);
		$newMax = $val["maxID"]+1;
		$sessionUser = $_SESSION['username'];
	
		$gidQuery = "SELECT gID FROM Groups WHERE gName='$applyNameVal'";	
		$gidResult = mysqli_query($conn, $gidQuery) or die("Could not f= group name");
		$gid = mysqli_fetch_array($gidResult)["gID"];

		$checkQuery = "SELECT * FROM Membership WHERE gID =$gid AND username='$sessionUser'";
		$checkResult = mysqli_query($conn, $checkQuery);
		
		if(mysqli_num_rows($checkResult==0)) {
			$insertQuery = "INSERT INTO Requests (rID, rMessage, username, gID, fromGroup)
					VALUES ($newMax, '$applyMsgVal','$sessionUser', $gid, 0)";
			$insertResult = mysqli_query($conn, $insertQuery)
					or die("Insert query failed");
		}
		$_POST = array();
	}

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
	echo "</tr>\n";


	while($row = mysqli_fetch_row($result)) {
		echo "<tr>";
		foreach($row as $cell)	{
			echo "<td>$cell</td>";
		}
		echo "</tr>\n";
	}

	$query = "DROP VIEW IF EXISTS GroupsAndMembersInfo";
	$result = mysqli_query($conn, $query)
		  or die("Query to drop view failed");
	
	mysqli_free_result($result);
	mysqli_free_result($maxResult);
	mysqli_free_result($insertResult);
	mysqli_close($conn);
?>
  </div>
  </body>
  <script type="text/javascript" src="js/addGroup.js"></script>
</html>

<?php
	
?>


	
