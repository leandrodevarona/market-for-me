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
    const html = await parseEmailTemplate(template.name, template.params);

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

async function parseEmailTemplate(
  name: TemplateParams["name"],
  params: TemplateParams["params"]
): Promise<string> {
  // Read the raw template file
  const rawTemplate = fs.readFileSync(
    `./src/lib/utils/email/templates/${name}.ejs`,
    "utf8"
  );
  // Run the template through EJS to replace variables with parameter values
  return ejs.render(rawTemplate, params);
}
