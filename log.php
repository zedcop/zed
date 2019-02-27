<?php
$email=$_POST['email'];
$password=$_POST['password'];
$con=mysqli_connect("localhost","id8370844_root","toor@123","id8370844_register");
$q="select * from users where email='$email' and password='$pass'";
$result=mysqli_query($con,$q);
$no=mysqli_num_rows($result);
if ($no!=0) {
	header('location:login.php');
}
else{
	header('location:register.php');
}
?>