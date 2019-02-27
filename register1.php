<!DOCTYPE html>
<html>
<head>
	<title>Register</title>
</head>
<body background="register.jpg"> 
	<form action="l.php" method="POST">
		<style type="text/css">
			div{
				text-align: left;
				padding-left: 43%;
				font-size: 25px;
			}
			h1{
				font-size: 50px;
				height: 20;
				width: 100;	
			}
			input{
				font-size: 20px;
			}
		</style>
		<center><br>
		<h1 > REGISTER </h1> <br>
		<div> Full Name:</div>
		<input type="text" name="name" required=""><br>
		<div > Phone Number :</div>
		<input type="text" name="number" required=""><br>
		<div> Email: </div>
		<input type="email" name="email" required=""><br>
		<div>Password: </div>
		<input type="Password" name="password" required=""><br><br>
		<input type="submit" name="submit" value="REGISTER">
	</center>
	</form>

</body>
</html>