<?php
$name=$_POST['number'];
if ($name==6) {
	echo "Ohhh You Hacked Me...";
	header( "refresh:3;url=http://zedcops.000webhostapp.com/login1.php" );

}
else{
	echo "You are Wrong, Try again...";
}


