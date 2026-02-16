<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *'); 
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

$receiving_email = "aryanbhanot2005@gmail.com"; 
$leads_file = 'leads.json'; // This will store your dashboard data

$input = file_get_contents('php://input');
$data = json_decode($input, true);

// Extract Lead Data
$name = isset($data['name']) ? htmlspecialchars(trim($data['name'])) : '';
$email = isset($data['email']) ? htmlspecialchars(trim($data['email'])) : '';
$company = isset($data['company']) ? htmlspecialchars(trim($data['company'])) : 'N/A';
$role = isset($data['role']) ? htmlspecialchars(trim($data['role'])) : 'N/A';
$lookingFor = isset($data['lookingFor']) ? htmlspecialchars(trim($data['lookingFor'])) : '';
$details = isset($data['details']) ? htmlspecialchars(trim($data['details'])) : '';

if (empty($name) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Invalid name or email."]);
    exit;
}

// 1. Save to JSON File for Dashboard
$new_lead = [
    "id" => uniqid(),
    "date" => date('Y-m-d H:i:s'),
    "name" => $name,
    "email" => $email,
    "company" => $company,
    "role" => $role,
    "intent" => $lookingFor,
    "details" => $details
];

$current_data = file_exists($leads_file) ? json_decode(file_get_contents($leads_file), true) : [];
$current_data[] = $new_lead;
file_put_contents($leads_file, json_encode($current_data, JSON_PRETTY_PRINT));

// 2. Prepare Email for Admin and User
$subject = "New Lead: " . $name . " - " . $company;
$body = "New Portfolio Interaction:\n\n";
$body .= "Name: $name\nEmail: $email\nCompany: $company\nRole: $role\nLooking For: $lookingFor\nDetails: $details";

$headers = "From: bot@yourdomain.com\r\nReply-To: $email\r\nX-Mailer: PHP/" . phpversion();

// Send to Admin
mail($receiving_email, $subject, $body, $headers);
// Send Confirmation to User
mail($email, "Thank you for reaching out, $name", "Hi $name,\n\nI have received your inquiry regarding $lookingFor. My AI assistant is now available to answer your questions.\n\nBest,\nAryan Bhanot", $headers);

echo json_encode(["success" => true, "message" => "Lead captured and email sent."]);
?>