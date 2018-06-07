<?php session_start(); ?>

<div id="react-header"></div>

<script src="/~okonekp/cs340/DatabasesFinal/client/out/header.bundle.js"></script>
<script>
	ExpenseTracker.renderHeader("<?php echo $_SESSION["username"]; ?>", "react-header");
</script>