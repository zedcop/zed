<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "login";

try{
  $conn = new PDO("mysql:host= $servername; dbname=$dbname" , $username, $password);

  $conn->setAttribute(PDO::ATTR_ERRMODE, PDO:: ERRMODE_EXCEPTION);

  $name = $password = $nameErr =$passwordErr =$error = "";

  if ($SERVER["REQUEST_METHOD"]=="POST") {
    if (empty(test_input($_POST["name"]))) {
      $nameErr = "Enter Username";
    }else{
      $name = test_input($_POST["name"]);
    }
    if(empty(test_input($_POST["password"])))
    $passwordErr = "Enter password";
  }
  else{
    $password = test_input($POST["password"]
  );
  }
}


catch (PDOException $e){
  echo "Error :".$e->getMessage();
}

function test_input($data)
{
  $data = trim($data);
  $data = stripcslashes($data);
  $data = htmlspecialchars($data);
  return $data;
}


?>





<!DOCTYPE html>
<html>
<head>
  <title>User Login</title>
</head>
<body>
  <form action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"])?>"    method="POST">
      Username: <input type="text" name="name">
      <br><br>
      Password: <input type="password" name="password">
      <br><br>
      <input type="submit" name="submit" value="Login">

  </form>

</body>
</html>