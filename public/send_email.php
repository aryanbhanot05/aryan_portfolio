<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *'); // IMPORTANT: Adjust this in production!

// Define your email address
$receiving_email = "aryanbhanot2005@gmail.com"; 

// 1. Get the JSON data sent from the React fetch request
$input = file_get_contents('php://input');
$data = json_decode($input, true);

// 2. Validate and sanitize inputs
$name = isset($data['name']) ? htmlspecialchars(trim($data['name'])) : '';
$email = isset($data['email']) ? htmlspecialchars(trim($data['email'])) : '';
$message = isset($data['message']) ? htmlspecialchars(trim($data['message'])) : '';

// Basic validation check
if (empty($name) || empty($email) || empty($message) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400); // Bad Request
    echo json_encode(["success" => false, "message" => "Please fill all required fields and use a valid email."]);
    exit;
}

// 3. Construct the Email Content
$subject = "New Portfolio Message from " . $name;
$body = "Name: " . $name . "\n";
$body .= "Email: " . $email . "\n";
$body .= "Message:\n" . $message;

// 4. Set Headers for proper delivery
$headers = "From: noreply@" . $_SERVER['HTTP_HOST'] . "\r\n"; // Sender address based on your domain
$headers .= "Reply-To: " . $email . "\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

// 5. Send the Email using the built-in mail() function
if (mail($receiving_email, $subject, $body, $headers)) {
    http_response_code(200); // OK
    echo json_encode(["success" => true, "message" => "Message sent successfully!"]);
} else {
    // Note: mail() can return false even on temporary failures. Check server logs for details.
    http_response_code(500); // Internal Server Error
    echo json_encode(["success" => false, "message" => "Server error: Could not send email."]);
}
?>