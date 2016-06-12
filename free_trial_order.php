<?php
//if "email" variable is filled out, send email
if (isset($_REQUEST['email']))  {
    //Email information
    $admin_email = "alexander.steglin@gmail.com";
    $email = $_REQUEST['email'];
    $first_name = $_REQUEST['first_name'];
    $last_name = $_REQUEST['first_name'];

    //send email
    mail($admin_email, "$first_name", $first_name, "From:" . $email);

    //Email response
    echo "Thank you for contacting us!";
}
