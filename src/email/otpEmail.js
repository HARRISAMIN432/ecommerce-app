export const otpEmail = (otp) => {
  const html = `
<!DOCTYPE html>
<html lang="en" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:v="urn:schemas-microsoft-com:vml">

<head>
    <title>Your OTP Code</title>
    <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
    <meta content="width=device-width, initial-scale=1.0" name="viewport" />
    <style>
        * {
            box-sizing: border-box;
        }

        body {
            margin: 0;
            padding: 0;
            font-family: Tahoma, Verdana, Segoe, sans-serif;
        }

        a[x-apple-data-detectors] {
            color: inherit !important;
            text-decoration: inherit !important;
        }

        #MessageViewBody a {
            color: inherit;
            text-decoration: none;
        }

        p {
            line-height: inherit
        }

        .desktop_hide,
        .desktop_hide table {
            mso-hide: all;
            display: none;
            max-height: 0px;
            overflow: hidden;
        }

        .image_block img+div {
            display: none;
        }

        sup,
        sub {
            font-size: 75%;
            line-height: 0;
        }

        @media (max-width:520px) {
            .desktop_hide table.icons-inner {
                display: inline-block !important;
            }

            .icons-inner {
                text-align: center;
            }

            .icons-inner td {
                margin: 0 auto;
            }

            .mobile_hide {
                display: none;
            }

            .row-content {
                width: 100% !important;
            }

            .stack .column {
                width: 100%;
                display: block;
            }

            .mobile_hide {
                min-height: 0;
                max-height: 0;
                max-width: 0;
                overflow: hidden;
                font-size: 0px;
            }

            .desktop_hide,
            .desktop_hide table {
                display: table !important;
                max-height: none !important;
            }
        }
        
        .otp-code {
            font-family: 'Courier New', monospace;
            font-size: 32px;
            font-weight: bold;
            letter-spacing: 8px;
            background: linear-gradient(135deg, #7747FF, #3A1C71);
            color: white;
            padding: 20px 40px;
            border-radius: 12px;
            display: inline-block;
            margin: 20px 0;
            box-shadow: 0 4px 15px rgba(119, 71, 255, 0.2);
        }
        
        .expiry-time {
            color: #7747FF;
            font-weight: bold;
            font-size: 16px;
        }
        
        .warning-box {
            background-color: #fff8e1;
            border-left: 4px solid #ffc107;
            padding: 15px;
            margin: 20px 0;
            border-radius: 4px;
        }
    </style>
</head>

<body class="body"
    style="background-color: #FFFFFF; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
    <table border="0" cellpadding="0" cellspacing="0" class="nl-container" role="presentation"
        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #FFFFFF;" width="100%">
        <tbody>
            <tr>
                <td>
                    <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-1"
                        role="presentation"
                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #f5f5f5; padding:50px 0;"
                        width="100%">
                        <tbody>
                            <tr>
                                <td>
                                    <table align="center" border="0" cellpadding="0" cellspacing="0"
                                        class="row-content stack" role="presentation"
                                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff; color: #000000; width: 500px; margin: 0 auto; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1);"
                                        width="500">
                                        <tbody>
                                            <tr>
                                                <td class="column column-1"
                                                    style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 30px; padding-top: 30px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;"
                                                    width="100%">
                                                    
                                                    <!-- Logo/Header Section -->
                                                    <table border="0" cellpadding="0" cellspacing="0"
                                                        class="image_block block-1" role="presentation"
                                                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                                        width="100%">
                                                        <tr>
                                                            <td class="pad"
                                                                style="padding-bottom:20px;padding-left:20px;padding-right:20px;width:100%;">
                                                                <div align="center" class="alignment"
                                                                    style="line-height:10px">
                                                                    <div style="max-width: 200px;"><img
                                                                            alt="Company Logo" height="auto"
                                                                            src="https://res.cloudinary.com/do7xdfl3y/image/upload/v1737487850/next-ecommerce/rb_27348_hfzgxd.png"
                                                                            style="display: block; height: auto; border: 0; width: 100%;"
                                                                            title="Company Logo" width="200" /></div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                    
                                                    <!-- Title Section -->
                                                    <table border="0" cellpadding="0" cellspacing="0"
                                                        class="heading_block block-2" role="presentation"
                                                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                                        width="100%">
                                                        <tr>
                                                            <td class="pad" style="text-align:center;width:100%;padding:0 20px;">
                                                                <h1
                                                                    style="margin: 0; color: #393d47; direction: ltr; font-family: Tahoma, Verdana, Segoe, sans-serif; font-size: 28px; font-weight: 700; letter-spacing: normal; line-height: 120%; text-align: center; margin-top: 0; margin-bottom: 10px; mso-line-height-alt: 33.6px;">
                                                                    One-Time Password (OTP)
                                                                </h1>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                    
                                                    <!-- Description Section -->
                                                    <table border="0" cellpadding="10" cellspacing="0"
                                                        class="paragraph_block block-3" role="presentation"
                                                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;"
                                                        width="100%">
                                                        <tr>
                                                            <td class="pad" style="padding:20px;">
                                                                <div
                                                                    style="color:#393d47;font-family:Tahoma,Verdana,Segoe,sans-serif;font-size:16px;line-height:150%;text-align:center;mso-line-height-alt:24px;">
                                                                    <p style="margin: 0 0 20px 0; word-break: break-word;">
                                                                        Use the following One-Time Password to verify your identity and complete your login.
                                                                    </p>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                    
                                                    <!-- OTP Code Display -->
                                                    <table border="0" cellpadding="10" cellspacing="0"
                                                        class="heading_block block-4" role="presentation"
                                                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                                        width="100%">
                                                        <tr>
                                                            <td class="pad" style="padding:0 20px;">
                                                                <div align="center" style="text-align:center;">
                                                                    <div class="otp-code">
                                                                        ${otp}
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                    
                                                    <!-- Expiry Information -->
                                                    <table border="0" cellpadding="10" cellspacing="0"
                                                        class="paragraph_block block-3" role="presentation"
                                                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;"
                                                        width="100%">
                                                        <tr>
                                                            <td class="pad" style="padding:20px;">
                                                                <div
                                                                    style="color:#393d47;font-family:Tahoma,Verdana,Segoe,sans-serif;font-size:16px;line-height:150%;text-align:center;mso-line-height-alt:24px;">
                                                                    <p style="margin: 10px 0; word-break: break-word;">
                                                                        This OTP is valid for:
                                                                        <span class="expiry-time">10 minutes</span>
                                                                    </p>
                                                                    <p style="margin: 10px 0; word-break: break-word;">
                                                                        Do not share this code with anyone.
                                                                    </p>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                    
                                                    <!-- Security Warning -->
                                                    <table border="0" cellpadding="10" cellspacing="0"
                                                        class="paragraph_block block-3" role="presentation"
                                                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;"
                                                        width="100%">
                                                        <tr>
                                                            <td class="pad" style="padding:0 20px;">
                                                                <div class="warning-box">
                                                                    <div
                                                                        style="color:#393d47;font-family:Tahoma,Verdana,Segoe,sans-serif;font-size:14px;line-height:150%;text-align:center;mso-line-height-alt:21px;">
                                                                        <p style="margin: 0; word-break: break-word;">
                                                                            <strong>⚠️ Security Notice:</strong><br/>
                                                                            Our team will never ask for your OTP. If you didn't request this code, please ignore this email and contact our support team immediately.
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                    
                                                    <!-- Footer -->
                                                    <table border="0" cellpadding="0" cellspacing="0"
                                                        class="paragraph_block block-5" role="presentation"
                                                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word; margin-top: 30px;"
                                                        width="100%">
                                                        <tr>
                                                            <td class="pad"
                                                                style="padding:20px; border-top: 1px solid #eee;">
                                                                <div
                                                                    style="color:#666;font-family:Tahoma,Verdana,Segoe,sans-serif;font-size:12px;line-height:150%;text-align:center;mso-line-height-alt:18px;">
                                                                    <p style="margin: 10px 0;">
                                                                        <em>This is an automated message. Please do not reply to this email.</em>
                                                                    </p>
                                                                    <p style="margin: 0;">
                                                                        Thank you,<br />
                                                                    </p>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
        </tbody>
    </table>
</body>

</html>
      `;

  return html;
};
