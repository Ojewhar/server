const RejectCertificate = (fullname) => {
  return `
    <!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Medical Certificate Request Rejection</title>
<style>
    /* Reset styles */
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
    .signature {
        margin-top: 40px;
        border-top: 1px solid #ccc;
        padding-top: 20px;
        color: #999;
    }
</style>
</head>
<body>

<div class="container">
    <h1>Rejection</h1>
    <p>Dear - <strong>${fullname}</strong></p>
    <p>Thank you for submitting your request for a medical certificate.</p>
    <p>Unfortunately, on this occasion your doctor believes you may need more urgent care and/or a more thorough assessment based on one or more of your responses.</p>
    <p>While we appreciate your time in requesting a medical certificate, your health is our priority.</p>
    <p>Please seek appropriate medical care in this instance, by seeing your local doctor or presenting to your nearest emergency department.</p>
    <div class="ps-note">
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
    <p>We look forward to helping you out in the future.</p>
    <div class="signature">
        <p>Yours sincerely,</p>
        <p>The team at <strong>Certnow</strong></p>
    </div>
</div>

</body>
</html>

    
    `;
};
module.exports = { RejectCertificate };
