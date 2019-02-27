<!DOCTYPE html>
<html>
<head>
	<title>Login</title>
</head>
<body background="register.jpg"> 
	<form action="log.php" method="POST">
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
		<h1 > LOGIN </h1> <br>
		<div> Email: </div>
		<input type="email" name="email" required=""><br>
		<div>Password: </div>
		<input type="password" name="password" required=""><br><br>
		<input type="submit" name="submit" value="LOGIN">
	</center>
	</form>

</body>
</html>