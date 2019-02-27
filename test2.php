
<!DOCTYPE html>
<html>
<head>
	<title></title>
</head>
<body>
<?php
if (isset($_COOKIE['userid'])) {
	echo "welcome Mr.".$_COOKIE['userid'];
}
?>
<br>
<?php
session_start();
?>
Welcome <?php  echo $_SESSION['userid']; ?>


</body>
</html>
