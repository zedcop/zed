<?php
$name=$_POST['name'];
$number=$_POST['number'];
$email=$_POST['email'];
$password=$_POST['password'];
$con=mysqli_connect("localhost","root","","login");
$id="insert into users values('$name','$number','$email','$password')";

mysqli_query($con, $id);

echo "Success... You can Login now..."."<br>"; 

?>