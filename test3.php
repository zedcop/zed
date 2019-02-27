<?php
$name=$_POST['user'];
$email=$_POST['email'];
$pass=$_POST['pass'];
$con=mysqli_connect("localhost","root","","login");
$id="insert into users values('$name','$email','$pass')";

mysqli_query($con, $id);

echo "Record added"."<br>"; 




?>