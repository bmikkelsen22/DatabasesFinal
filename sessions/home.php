<?php
    session_start();
    ob_start();
    $currentpage="Home Page";
    include "pages.php";
?>

<!DOCTYPE html>

<html lang="en" >

<head>
  <meta charset="UTF-8">
  <title>Sign Up/Login In</title>  
      <style>
        @import url(https://fonts.googleapis.com/css?family=Raleway:400,100,200,300);
* {
  margin: 0;
  padding: 0; }

a {
  color: #666;
  text-decoration: none; }
  a:hover {
    color: #4FDA8C; }

input {
  font: 16px/26px "Raleway", sans-serif; }

body {
  color: #666;
  background-color: #f1f2f2;
  font: 16px/26px "Raleway", sans-serif; }

.form-wrap {
  background-color: #fff;
  width: 320px;
  margin: 3em auto;
  box-shadow: 0px 1px 8px #BEBEBE;
  -webkit-box-shadow: 0px 1px 8px #BEBEBE;
  -moz-box-shadow: 0px 1px 8px #BEBEBE; }
  .form-wrap .tabs {
    overflow: hidden; }
    .form-wrap .tabs h3 {
      float: left;
      width: 50%; }
      .form-wrap .tabs h3 a {
        padding: 0.5em 0;
        text-align: center;
        font-weight: 400;
        background-color: #e6e7e8;
        display: block;
        color: #666; }
        .form-wrap .tabs h3 a.active {
          background-color: #fff; }
  .form-wrap .tabs-content {
    padding: 1.5em; }
    .form-wrap .tabs-content div[id$="tab-content"] {
      display: none; }
    .form-wrap .tabs-content .active {
      display: block !important; }
  .form-wrap form .input {
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    color: inherit;
    font-family: inherit;
    padding: .8em 0 10px .8em;
    border: 1px solid #CFCFCF;
    outline: 0;
    display: inline-block;
    margin: 0 0 .8em 0;
    padding-right: 2em;
    width: 100%; }
  .form-wrap form .button {
    width: 100%;
    padding: .8em 0 10px .8em;
    background-color: #28A55F;
    border: none;
    color: #fff;
    cursor: pointer;
    text-transform: uppercase; }
    .form-wrap form .button:hover {
      background-color: #4FDA8C; }
  .form-wrap form .checkbox {
    visibility: hidden;
    padding: 20px;
    margin: .5em 0 1.5em; }
    .form-wrap form .checkbox:checked + label:after {
      -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=100)";
      filter: alpha(opacity=100);
      opacity: 1; }
  .form-wrap form label[for] {
    position: relative;
    padding-left: 20px;
    cursor: pointer; }
    .form-wrap form label[for]:before {
      content: '';
      position: absolute;
      border: 1px solid #CFCFCF;
      width: 17px;
      height: 17px;
      top: 0px;
      left: -14px; }
    .form-wrap form label[for]:after {
      -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
      filter: alpha(opacity=0);
      opacity: 0;
      content: '';
      position: absolute;
      width: 9px;
      height: 5px;
      background-color: transparent;
      top: 4px;
      left: -10px;
      border: 3px solid #28A55F;
      border-top: none;
      border-right: none;
      -webkit-transform: rotate(-45deg);
      -moz-transform: rotate(-45deg);
      -o-transform: rotate(-45deg);
      -ms-transform: rotate(-45deg);
      transform: rotate(-45deg); }
  .form-wrap .help-text {
    margin-top: .6em; }
    .form-wrap .help-text p {
      text-align: center;
      font-size: 14px; }

    </style>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/prefixfree/1.0.7/prefixfree.min.js"></script>
    <script src='http://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js'></script>
    <script type = "text/javascript"  src="./js/home.js" > </script> 
    <script type="text/javascript">
        import * as React from "react";
        import * as ReactDOM from "react-dom";
        import { Header } from "./header";
        import { UserModel } from "../models";

        function renderHeader(username: string, elementId: string) {
           ReactDOM.render(
            <Header username={username} />,
            document.getElementById(elementId)
            );
          }
    </script>

</head>

<?php
// change the value of $dbuser and $dbpass to your username and password

  include 'connectvars.php'; 
  include "header.php";
  $msg = "<center>Sign Up or Log In!</center>";

// change the value of $dbuser and $dbpass to your username and password
  include 'connectvars.php'; 
  
  $conn = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);
  if (!$conn) {
    die('Could not connect: ' . mysql_error());
  }

  if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['sign-up-form']) && $_POST['user_name'] != "") {

// Escape user inputs for security
    $salt = base64_encode(mcrypt_create_iv(12 , MCRYPT_DEV_URANDOM));

    $username = mysqli_real_escape_string($conn, $_POST['user_name']);
    $firstName = mysqli_real_escape_string($conn, $_POST['firstName']);
    $lastName = mysqli_real_escape_string($conn, $_POST['lastName']);
    $password = MD5(mysqli_real_escape_string($conn, $_POST['password'] . $salt));
    $email = mysqli_real_escape_string($conn, $_POST['email']);
  
// See if pid is already in the table
    $queryIn = "SELECT * FROM Users where username='$username' ";
    $resultIn = mysqli_query($conn, $queryIn);
    if (mysqli_num_rows($resultIn)> 0) {
      $msg = "Username not available! Please choose another.";
    } else {
    // attempt insert query 
      
      $query = "INSERT INTO Users (username, firstName, lastName, email, password, salt) VALUES ('$username', '$firstName', '$lastName', '$email', '$password', '$salt') ";

      if(mysqli_query($conn, $query)){
        $msg =  "Registration successfull. <p>";
      } else{
        $msg = "ERROR: Could not execute $query. " . mysqli_error($conn);
      }
    }
}  

if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['log-in-form']) && $_POST['user_login'] != "") {

    $username = mysqli_real_escape_string($conn, $_POST['user_login']);
    // $_SESSION['username'] = '$username';
    $sql = "SELECT salt FROM Users WHERE username='$username' ";
    $result = mysqli_query($conn, $sql);
    $salt = "";
    if ($row = mysqli_fetch_assoc($result)) {
      $salt = $row['salt'];
    }

    $password = MD5(mysqli_real_escape_string($conn, $_POST['user_pass'] . $salt));

    $queryIn = "SELECT * FROM Users where username='$username' and password='$password' ";
    $resultIn = mysqli_query($conn, $queryIn);
    if (mysqli_num_rows($resultIn) > 0) {
      $_SESSION["username"] = $username;
      //echo isset($_SESSION["username"]) . "</br>";
      session_write_close();
      $msg ="<center><h2>Log In Success!</h2><br>Welcome $username!<p></center>";
    } else {
      $msg ="<h2>Error logging in</h2> Incorrect username or password<p>";
    }
}
    mysqli_close($conn);
?>

<body>

 <h2> <?php echo $msg; ?> </h2>
  <div class="form-wrap">
		<div class="tabs">
			<h3 class="signup-tab"><a class="active" href="#signup-tab-content">Sign Up</a></h3>
			<h3 class="login-tab"><a href="#login-tab-content">Login</a></h3>
		</div><!--.tabs-->



		<div class="tabs-content">
			<div id="signup-tab-content" class="active">
				<form class="signup-form" id="addForm" name="addForm" action="" method="post">
          <input type="hidden" name="sign-up-form" value="yes">
					<input type="email" class="input" id="email" name="email" autocomplete="off" placeholder="Email">
					<input type="text" class="input" id="user_name" name="user_name" autocomplete="off" placeholder="Username">
          <input type="text" class="input" id="firstName" name="firstName" autocomplete="off" placeholder="First Name">
          <input type="text" class="input" id="lastName" name="lastName" autocomplete="off" placeholder="Last Name">
          <input type="password" class="input" id="password" name="password" autocomplete="off" placeholder="Password">
          <input type="password" class="input" id="confirmPassword" autocomplete="off" placeholder="Confirm Password">

					<input type="submit" class="button" value="Sign Up">
				</form>
			</div>

			<div id="login-tab-content">
				 <form class="login-form" action="" method="post">
          <input type="hidden" name="log-in-form" value="yes">
					<input type="text" class="input" name="user_login" id="user_login" autocomplete="off" placeholder="Username">
					<input type="password" class="input" name="user_pass" id="user_pass" autocomplete="off" placeholder="Password">
					<input type="submit" class="button" value="Login">
				</form><!--.login-form-->
			</div><!--.login-tab-content-->
		</div><!--.tabs-content-->
	</div><!--.form-wrap-->
 <script type = "text/javascript"  src="./js/verifyInput.js" > </script> 
</body>
</html>
