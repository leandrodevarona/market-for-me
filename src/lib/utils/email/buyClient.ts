import { Routes } from "@utils/routes";
import { createTransport, type Transporter } from "nodemailer";

type BuyClientTemplateParams = {
  params: {
    name: string;
    phone: string;
    invoiceNumber: string;
    invoiceBase64: string;
  };
};

type SendEmailOptions = {
  /** Email address of the recipient */
  to: string;
  /** Subject line of the email */
  subject: string;
  /** Parameters to send to the template */
  template: BuyClientTemplateParams;
};

export async function sendBuyClientEmail(
  options: SendEmailOptions
): Promise<Transporter> {
  const transporter = await getEmailTransporter();
  return new Promise(async (resolve, reject) => {
    // Build the email message
    const { to, subject, template } = options;
    // Parse email template
    const html = parseEmailTemplate(template.params);

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

function parseEmailTemplate(params: BuyClientTemplateParams["params"]): string {
  const baseUrl = import.meta.env.SITE.slice(0, -1);

  return `<div
  style="
    max-width: 600px;
    border: 1px solid #efefef;
    padding: 16px;
    font-family: Segoe UI, Tahoma, Geneva, Verdana, sans-serif;
  "
>
  <!-- Header -->
  <div style="margin-bottom: 32px">
    <p>Se ha realizado una compra en su tienda.</p>
    <p><strong>Número de factura:</strong> ${params.invoiceNumber}</p>
  </div>
  <!-- Main Content -->
  <div style="margin-bottom: 32px; color: #222">
    <p style="margin-bottom: 16px">Hola, ${params.name},</p>
    <p>
      Se realizó una compra en su tienda. Usted debe <strong>contactar al cliente</strong> 
      a traves del número de teléfono: ${params.phone}. 
      Si no logra contactar al cliente, usted puede <strong>devolver el stock</strong> de productos que este usó 
      dando click en el siguiente botón:
    </p>
    <a
      href="${baseUrl}${Routes.returnStock(params.invoiceNumber)}"
      target="_blank"
      style="
        text-decoration: none;
        padding: 0.5rem;
        background-color: #4b484830;
        font-size: larger;
      "
    >
      Devolver stock
    </a>
  </div>
  <!-- Footer -->
  <div style="color: #5f5f5f">
    <p>
      Si usted no es el destinatario previsto, por favor ignore este correo.
    </p>
  </div>
</div>
`;
}
