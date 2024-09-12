import ejs from "ejs";
import fs from "fs";
import { createTransport, type Transporter } from "nodemailer";

type BuyClientParams = {
  name: "buyClient";
  params: {
    name: string;
    invoiceNumber: string;
    invoiceBase64: string;
  };
};

type TemplateParams = BuyClientParams;

type SendEmailOptions = {
  /** Email address of the recipient */
  to: string;
  /** Subject line of the email */
  subject: string;
  /** Parameters to send to the template */
  template: TemplateParams;
};

export async function sendEmail(
  options: SendEmailOptions
): Promise<Transporter> {
  const transporter = await getEmailTransporter();
  return new Promise(async (resolve, reject) => {
    // Build the email message
    const { to, subject, template } = options;
    // Parse email template

    const params = options.template.params;

    const html = `<div
  style="
    max-width: 600px;
    border: 1px solid #efefef;
    padding: 16px;
    font-family:
      Segoe UI,
      Tahoma,
      Geneva,
      Verdana,
      sans-serif;
  "
>
  <!-- Header -->
  <div style="margin-bottom: 32px">
    <p>Se ha realizado una compra en su tienda.</p>
    <p><strong>Número:</strong> ${params.invoiceNumber}</p>
  </div>
  <!-- Main Content -->
  <div style="margin-bottom: 32px; color: #222">
    <p style="margin-bottom: 16px">Hola, ${params.name},</p>
    <p>
      Se ha realizado una compra en su tienda. Usted debe esperar a que un
      cliente lo contacte por <strong>Whatsapp</strong> y le mandé una factura
      con el mismo número que se muestra en el título de este correo. Si no es
      así, usted puede <strong>devolver el stock</strong> de productos que usó
      el usuario. Dichos productos se muestran en la factura adjunta a este
      correo.
    </p>
  </div>
  <!-- Footer -->
  <div style="color: #5f5f5f">
    <p>
      Si usted no es el destinatario previsto, por favor ignore este correo.
    </p>
  </div>
</div>
`;

    const from =
      import.meta.env.SEND_EMAIL_FROM || "MyApp <noreply@example.com>";

    const attachments = [
      {
        // encoded string as an attachment
        filename: "invoice.pdf",
        content: template.params.invoiceBase64,
        encoding: "base64",
      },
    ];

    const message = { to, subject, html, from, attachments };

    // Send the email
    transporter.sendMail(message, (err, info) => {
      // Log the error if one occurred
      if (err) {
        console.error(err);
        reject(err);
      }
      // Log the message ID and preview URL if available.
      console.log("Message sent:", info.messageId);
      resolve(info);
    });
  });
}

async function getEmailTransporter(): Promise<Transporter> {
  return new Promise((resolve) => {
    if (!import.meta.env.RESEND_API_KEY) {
      throw new Error("Missing Resend configuration");
    }
    const transporter = createTransport({
      host: "smtp.resend.com",
      secure: true,
      port: 465,
      auth: { user: "resend", pass: import.meta.env.RESEND_API_KEY },
    });
    resolve(transporter);
  });
}

// async function parseEmailTemplate(
//   name: TemplateParams["name"],
//   params: TemplateParams["params"]
// ): Promise<string> {
//   // Read the raw template file
//   const rawTemplate = fs.readFileSync(
//     `./src/lib/utils/email/templates/${name}.ejs`,
//     "utf8"
//   );
//   // Run the template through EJS to replace variables with parameter values
//   return ejs.render(rawTemplate, params);
// }
