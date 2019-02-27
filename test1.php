	<?php
	$name=$_POST['user'];
	$pass=$_POST['pass'];
	$con=mysqli_connect("localhost","id8370844_root","toor@123","id8370844_register");
	$q="select * from users where name='$name' and password='$pass'";
	$result=mysql_query($con,$q);
	$no=mysqli_num_rows($result);
	if ($no!=0) {
		header('location.ind.html');
	}
	else{
		header('location.login.php');
	}
?>

