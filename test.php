<!DOCTYPE html>
<html>
<head>
	<title>Test</title>
</head>
<body>
<form action="test1.php" method="POST">

<p> Login (Test1)</p>
USERNAME: <br>
<input type="text" name="user" value="user"><br>
PASSWORD: <br>
<input type="text" name="pass" value="pass">
<input type="submit" value="submit"><br>
<br><br><br>

</form>
<center>
<form action="test3.php" method="POST">
Register (Test3):
name:<br>
<input type="text"  name="user"><br>
email:<br>
<input type="text" name="email"><br>
password:<br>
<input type="text" name="pass"><br>
<input type="submit" value="submit"><br><br><br>
</form>

</center>

<?php
session_start();
?>
<?php
		$_SESSION['userid']='test';
?>
	<a href="test2.php">click </a>

	<br><br>

	<?php
	$name="userid";
	$value="john";
	setcookie($name,$value);
	?>
<a href="test2.php">click here (Test2)</a>

</body>
</html>