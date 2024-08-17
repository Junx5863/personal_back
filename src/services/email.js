const nodemailer = require("nodemailer");

const config = require("../config/config");

const transporter = nodemailer.createTransport(
  config.mailer,
);

const getMessageTemplate = (to, userName) => {
  const mailOptions = {
    from: config.mailer.auth.user,
    to: to,
    subject: "¡Bienvenido a GamesProducer!",
    html: `
            <!DOCTYPE html>
            <html lang="es">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Bienvenido</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        background-color: #f4f4f4;
                        margin: 0;
                        padding: 0;
                    }
                    .container {
                        width: 100%;
                        max-width: 600px;
                        margin: 0 auto;
                        background-color: #ffffff;
                        padding: 20px;
                        border-radius: 8px;
                        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                    }
                    .header {
                        text-align: center;
                        padding: 10px 0;
                    }
                    .header img {
                        width: 100px;
                    }
                    .content {
                        padding: 20px;
                        text-align: center;
                    }
                    .footer {
                        text-align: center;
                        padding: 10px 0;
                        font-size: 12px;
                        color: #888888;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <img src="https://via.placeholder.com/100" alt="Logo">
                    </div>
                    <div class="content">
                        <h1>¡Bienvenido, ${userName}!</h1>
                        <p>Gracias por registrarte en nuestro sitio web. Estamos emocionados de tenerte con nosotros.</p>
                        <p>Para comenzar, por favor verifica tu correo electrónico haciendo clic en el siguiente enlace:</p>
                        <p><a href="#" style="color: #007BFF; text-decoration: none;">Verificar Correo Electrónico</a></p>
                        <p>Si tienes alguna pregunta, no dudes en contactarnos.</p>
                        <p>Saludos,<br>El equipo de [Nombre de la Empresa]</p>
                    </div>
                    <div class="footer">
                        <p>&copy; 2023 [Nombre de la Empresa]. Todos los derechos reservados.</p>
                    </div>
                </div>
            </body>
            </html>
        `,
  };

  return mailOptions;
};

const sendEmail = async ({ to, userName }) => {
  try {
    const message = getMessageTemplate(to, userName);

    const info = await transporter.sendMail({
      ...message,
    });
    console.log("Message sent: %s", info.messageId);
    return info.messageId;
  } catch (error) {
    console.log("Error sending email: %s", error.message);
    return error.message;
  }
};

module.exports = {
  sendEmail,
};
