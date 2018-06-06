<?php session_start(); ?>

<header align="center" href="css/style.css"> 
		Expense Tracker
	</header>
	
	<nav>
		<ul>
		<?php
		foreach ($content as $page => $location){
			echo "<a href='$location?user=".$user."' ".($page==$currentpage?" class='active'":"").">".$page."  </a>";			
		}
		?>
		</ul>

	</nav>
