import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

export interface InvoiceSender {
  company: string;
  address: string;
  phone: string;
}

export interface InvoiceClient {
  name?: string | null;
  phone: string;
}

export interface InvoiceProduct {
  quantity: string;
  description?: string;
  taxRate: number;
  price: number;
  amount: number;
}

export interface InvoiceSettings {
  currency: string;
}

export interface InvoiceInformation {
  number: string;
  date: string;
}

export interface InvoiceData {
  sender: InvoiceSender;
  client: InvoiceClient;
  products: InvoiceProduct[];
  settings: InvoiceSettings;
  information: InvoiceInformation;
}

export async function createInvoice(data: InvoiceData) {
  const invoiceDate = data.information.date;
  const invoiceNumber = data.information.number;

  const address = data.sender.address;
  const name = data.sender.company;
  const phone = data.sender.phone;

  const clientName = data.client.name;
  const clientPhone = data.client.phone;

  const list = data.products;

  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595.28, 841.89]); // A4 size
  const { width, height } = page.getSize();
  const fontSize = 12;
  const padding = 20; // Padding for text
  const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);
  // Function to calculate centered x-position
  const calculateCenteredX = (text: string, width: number) =>
    (width - timesRomanFont.widthOfTextAtSize(text, fontSize + 10)) / 2;

  page.drawText("Invoice", {
    x: calculateCenteredX("Invoice", width) + padding,
    y: height - fontSize,
    size: fontSize + 10,
    font: timesRomanFont,
    color: rgb(0, 0.53, 0.71),
  });

  page.drawText(`Invoice Date: ${new Date(invoiceDate).toLocaleDateString()}`, {
    x: 50,
    y: height - 2 * fontSize,
    size: fontSize,
  });

  page.drawText(`Invoice Number: ${invoiceNumber}`, {
    x: 50,
    y: height - 4 * fontSize,
    size: fontSize,
  });

  page.drawText(`Bill To: ${name}`, {
    x: 50,
    y: height - 6 * fontSize,
    size: fontSize,
  });

  page.drawText(`Address: ${address}`, {
    x: 50,
    y: height - 7 * fontSize,
    size: fontSize,
  });

  page.drawText(`Phone: ${phone}`, {
    x: 50,
    y: height - 9 * fontSize,
    size: fontSize,
  });

  if (clientName)
    page.drawText(`Client Name: ${clientName}`, {
      x: 50,
      y: height - 15 * fontSize,
      size: fontSize,
    });

  page.drawText(`Client Phone: ${clientPhone}`, {
    x: 50,
    y: height - 16 * fontSize,
    size: fontSize,
  });

  // Draw Line Items
  const startY = height - 18 * fontSize;
  const lineItemSpacing = 1.5 * fontSize;
  page.drawText("Name     Quantity     Price     Amount", {
    x:
      calculateCenteredX("Name     Quantity     Price     Amount", width) +
      padding,
    y: startY,
    size: fontSize,
  });

  list.forEach(({ description, quantity, price, amount }, index) => {
    const y = startY - (index + 1) * lineItemSpacing;
    const lineItemText = `${description}     ${quantity}     $${price}     $${amount}`;
    page.drawText(lineItemText, {
      x: calculateCenteredX(lineItemText, width) + padding,
      y,
      size: fontSize,
    });
  });

  const pdfBytes = await pdfDoc.save();

  return Buffer.from(pdfBytes);
}
