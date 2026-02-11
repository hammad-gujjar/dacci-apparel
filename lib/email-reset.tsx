export function getResetPasswordEmailHtml(email: string, name: string, resetLink: string): string {
    return `
  <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset your password</title>
</head>

<body style="margin: 0%; padding: 0%; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif">
    <!-- WHITE CARD SECTION -->
    <table width="100%" cellpadding="0" cellspacing="0"
        style="background-color:#FEFCEF; max-width:600px; margin:0 auto;">
        <tr>
            <td align="center" style="padding:40px 30px; font-family: Arial, Helvetica, sans-serif;">

                <!-- Image -->
                <img src="https://i.pinimg.com/736x/97/e5/a7/97e5a7728ed2444a7ab4aef4adac3a86.jpg" alt="Reset Password" width="220"
                    style="display:block; margin-bottom:30px;" />

                <!-- Title -->
                <h2 style="
        font-size:22px;
        font-weight:600;
        color:#000000;
        margin:0 0 12px;
      ">
                    Forgot your password ${name}?
                </h2>

                <!-- Description -->
                <p style="
        font-size:14px;
        color:#6b6b6b;
        line-height:1.6;
        margin:0 0 28px;
      ">
                    We received a request to reset the password ${name} for your account associated with ${email}.
                </p>
                <p style="
        font-size:14px;
        color:#6b6b6b;
        line-height:1.6;
        margin:0 0 28px;
      ">
                    That's okay, it happens! Click on the button below to reset your password.
                </p>

                <!-- Button -->
                <a href="${resetLink}" style="
          display:inline-block;
          background-color:#000000;
          color:#ffffff;
          text-decoration:none;
          padding:14px 28px;
          font-size:13px;
          letter-spacing:1px;
          text-transform:uppercase;
        ">
                    Reset Your Password
                </a>

            </td>
        </tr>
    </table>

</body>
</html>
  `};