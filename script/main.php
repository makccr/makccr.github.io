<?php

if (isset($_POST['submit'])) {
    $name = $POST['name'];
    $email = $POST['email'];
    $mesage = $POST['message'];

    $target = "m@makc.co";
    $subject = "Bug Report Form";
    $headers = "From: ".$email;
    $text = "Message from: ".$name.".\n\n".$message;

    mail($target, $subject, $text, $headers);
    header("Location: /index.html?mailsend");
}

 ?>
