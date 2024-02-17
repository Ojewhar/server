const { BASE_URL_CLIENT } = require("../../config/base-url");

const AcceptCertificate = (fullname) => {
  return `
  <!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Medical Certificate Request Approved</title>
<style>
    
    body, h1, p {
        margin: 0;
        padding: 0;
    }
    body {
        font-family: Arial, sans-serif;
        line-height: 1.6;
        background-color: #f4f4f4;
        padding: 20px;
    }
    .container {
        max-width: 600px;
        margin: 0 auto;
        background-color: #fff;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
    h1 {
        color: #000;
        margin-bottom: 20px;
    }
    p {
        color: #000;
        margin-bottom: 20px;
    }
    .ps-note {
        color: #000;
    }
    .ps-note ul {
        margin-left: 20px;
    }
    .ps-note li {
        margin-bottom: 10px;
    }
    .button {
        display: inline-block;
        padding: 8px 20px;
        background-color: #6ca27c;
        color: #fff !important; /* Add !important */
        text-decoration: none;
        border-radius: 10px;
    }
    .button:hover {
        background-color: #6ca27c;
    }
    .signature {
        margin-top: 40px;
        border-top: 1px solid #000;
        padding-top: 20px;
        color: #999;
    }
</style>
</head>
<body>

<div class="container">
    <h1>Approved</h1>
    <p>Dear - <strong>${fullname}</strong></p>
    <p>Congratulations! Your doctor has approved your request for a medical certificate.</p>
    <p>Please login to your Certnow dashboard to complete payment and access your certificate.</p>
    <div class="ps-note">
        <p>PS: If you experience any changes to your condition, or are concerned, please see your local doctor, or present to your local emergency department.</p>
        <p>Call an ambulance (triple zero), if you are experiencing any of these symptoms or any other symptoms you are concerned about. Note this is not an exhaustive list:</p>
        <ul>
            <li>Severe pain</li>
            <li>Severe bleeding</li>
            <li>Limb weakness</li>
            <li>Shortness of breath</li>
            <li>Chest pain</li>
            <li>Major trauma</li>
            <li>Severe anxiety or depression</li>
            <li>Suicidality</li>
            <li>Difficulty with speech, swallowing, movement, vision</li>
        </ul>
    </div>
    <p>Click the link below to go to your dashboard:</p>
    <a href="${BASE_URL_CLIENT}/dashboard" class="button">Go to Dashboard</a>
    <div class="signature">
        <p>Yours sincerely,</p>
        <p>The team at <strong>Certnow</strong></p>
    </div>
</div>

</body>
</html>

    
    `;
};
module.exports = { AcceptCertificate };
