<?php
header("Access-Control-Allow-Origin: *");
require("PHPMailer_5.2.0/class.phpmailer.php");

// get refferer server 
    $name = isset($_POST['w3lName']) ? $_POST['w3lName'] : null;
    $email = isset($_POST['w3lSender']) ? $_POST['w3lSender'] : null;
    $phone = isset($_POST['w3lNumber']) ? $_POST['w3lNumber'] : null;
    $message = isset($_POST['w3lMessage']) ? $_POST['w3lMessage'] : null;

    /*$name = isset($_GET['w3lName']) ? $_GET['w3lName'] : null;
    $email = isset($_GET['w3lSender']) ? $_GET['w3lSender'] : null;
    $phone = isset($_GET['w3lNumber']) ? $_GET['w3lNumber'] : null;
    $message = isset($_GET['w3lMessage']) ? $_GET['w3lMessage'] : null;*/


    if($name && $email && $phone && $message) {  
        require('credential.php');

        $mail = new PHPMailer();
        try {
            //Server settings
            //$mail->SMTPDebug = SMTP::DEBUG_SERVER;                      //Enable verbose debug output
            $mail->isSMTP();                                            //Send using SMTP
            $mail->Host       = 'mail.1ststepinuk.co.uk;smtp.gmail.com;';                     //Set the SMTP server to send through
            $mail->SMTPAuth   = true;                                   //Enable SMTP authentication
            $mail->Username   = EMAIL;                     //SMTP username
            $mail->Password   = PASS;                               //SMTP password
            //$mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;         //Enable TLS encryption; `PHPMailer::ENCRYPTION_SMTPS` encouraged
            $mail->Port       = 587;                                    //TCP port to connect to, use 465 for `PHPMailer::ENCRYPTION_SMTPS` above

            //Recipients
            $mail->setFrom(TEST_EMAIL , '1stStepinuk');
            $mail->addAddress($email, $name);
            $mail->addReplyTo(TEST_EMAIL, 'Information');
            /*$mail->setFrom('from@example.com', 'Mailer');
            $mail->addAddress('joe@example.net', 'Joe User');     //Add a recipient
            $mail->addAddress('ellen@example.com');               //Name is optional
            $mail->addReplyTo('info@example.com', 'Information');
            $mail->addCC('cc@example.com');
            $mail->addBCC('bcc@example.com');*/

            //Attachments
            /*$mail->addAttachment('/var/tmp/file.tar.gz');         //Add attachments
            $mail->addAttachment('/tmp/image.jpg', 'new.jpg');    //Optional name*/

            //Content
            $mail->isHTML(true);    //Set email format to HTML
            $mail->Subject = 'Message from '. $name;
            $mail->Body = '<h3>Informations</h3>
                            <ul>
                                <li>Name: '. $name .'</li>
                                <li>Phone: '. $phone .'</li>
                                <li>Email: '. $email .'</li>                
                            </ul>
                            <h3>Message</h3>
                            <pre>'. $message .'</pre>';

            $mail->AltBody = '<h3>Informations</h3>
                            <ul>
                                <li>Name: '. $name .'</li>
                                <li>Phone: '. $phone .'</li>
                                <li>Email: '. $email .'</li>                
                            </ul>
                            <h3>Message</h3>
                            <pre>'. $message .'</pre>';;

            $mail->send();
            echo 'Message has been sent';
        } catch (Exception $e) {
            echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
        }
    } else {        
        echo "All the fields are required!";
    }
?>