const SubmitMedicaleCertificate = (fullname) => {
  return `
    
    <!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Medical Certificate Request</title>
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
    <h1>Certificate Request</h1>
    <p>Dear - <strong>${fullname}</strong></p>
    <p>Thank you for submitting your request for a medical certificate.</p>
    <p>A doctor will review your submission shortly and you will receive an email letting you know whether it has been approved or rejected. This usually takes up to a couple of hours, but in some circumstances may take up to 12 hours or longer. This is particularly the case if the submission is late at night (AEST) or during busy periods.</p>
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
    <div class="signature">
        <p>Yours sincerely,</p>
        <p>The team at <strong>Certnow</strong></p>
    </div>
</div>

</body>
</html>

    
    
    `;
};
module.exports = { SubmitMedicaleCertificate };
