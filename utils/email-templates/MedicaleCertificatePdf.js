const MedicaleCertificatePdf = (fromDate, toDate, patientName) => {
  return `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Medical Certificate</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 800px;
            margin: 20px auto;
            padding: 20px;
            border: 1px solid #ccc;
            border-radius: 10px;
        }
        .header {
            text-align: right;
        }
        .logo {
            max-width: 150px;
        }
        .title {
            font-size: 24px;
            font-weight: bold;
            text-align: center;
            margin-bottom: 20px;
        }
        .info {
            margin-bottom: 20px;
        }
        .info p {
            margin: 5px 0;
        }
        .sign_img{
            width:100px;
            height:auto;
        }
        .footer {
            margin-top: 50px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <img src="path_to_your_logo_image" alt="Logo" class="logo">
        </div>
        <h1 class="title">MEDICAL CERTIFICATE</h1>
        <div class="info">
            <p>Date of issue: ${fromDate}</p>
            <p>This document certifies that in my professional opinion <strong>${patientName}</strong> is unfit to attend</p>
            <p>WORK/STUDIES between ${fromDate}-${toDate} inclusive</p>
            <p>Medical Practitioner: Dr Emil Khalid</p>
            <img class="sign_img" src="/images/sign.jpg"  />
            <p>Address: 470 St Kilda Rd, Melbourne 3004</p>
            <p>AHPRA registration number: MED0002555681</p>
        </div>
        <div class="footer">
            <p>Note: This document is issued subject to the terms and conditions provided by the medical practice.</p>
        </div>
    </div>
</body>
</html>

    
    `;
};

export default MedicaleCertificatePdf;
