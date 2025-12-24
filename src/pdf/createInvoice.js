import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';

import { generateHeader } from './layout/header.js';
import { generateBuyerShipping } from './layout/buyerSeller.js';
import { generateItemsTable } from './layout/itemsTable.js';
import { generateFooter } from './layout/footer.js';
import drawInvoiceBorder from '../utils/format.js';

export function createInvoice(invoiceData) {
  const doc = new PDFDocument({ size: 'A4', margin: 40 });
  const outputPath = path.resolve('output', 'invoice.pdf');
  const writeStream = fs.createWriteStream(outputPath);
  

  // optional but recommended: catch stream errors
  writeStream.on('error', (err) => {
    console.error('PDF write error:', err);
  });

  // 🔹 First page border
  drawInvoiceBorder(doc);

  // 🔹 Border for every new page
  doc.on('pageAdded', () => {
    drawInvoiceBorder(doc);
  });

  doc.pipe(writeStream);

  generateHeader(doc, invoiceData);
  generateBuyerShipping(doc, invoiceData);
  generateItemsTable(doc, invoiceData)
  generateFooter(doc, invoiceData);

  doc.end();
}
