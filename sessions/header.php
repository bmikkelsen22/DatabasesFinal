<?php session_start(); ?>

<div id="react-header"></div>

<script src="./js/header.bundle.js"></script>
<script>
	ExpenseTracker.renderHeader("<?php echo $_SESSION["username"]; ?>", "react-header");
</script>
