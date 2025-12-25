import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';

import { drawBuyerRight, drawConsigneeLeft, drawExportHeaderBoxes, drawLogisticsGridLeft, drawNotifyLeft, drawOriginDestinationRight, drawTermsOfDeliveryRight } from './layout/header.js';
// import { generateBuyerShipping } from './layout/buyerSeller.js';
import { generateItemsTable } from './layout/itemsTable.js';
import { generateFooter } from './layout/footer.js';
import { drawInvoiceHeading } from './layout/heading.js';
import { drawInvoiceBorder } from '../utils/format.js';
import { baseText } from '../utils/typography.js';

export function createInvoice(invoiceData) {
  const doc = new PDFDocument({ 
    size: 'A4', 
    margins: { top: 12, bottom: 12, left: 12, right: 12 } 
  });
  
  const outputPath = path.resolve('output', 'invoice.pdf');
  const writeStream = fs.createWriteStream(outputPath);
  
  writeStream.on('error', (err) => {
    console.error('PDF write error:', err);
  });

  baseText(doc);

  // First page border
  drawInvoiceBorder(doc);

  // Border for every new page
  doc.on('pageAdded', () => {
    drawInvoiceBorder(doc);
    drawInvoiceHeading(doc, "EXPORT INVOICE");
  });

  doc.pipe(writeStream);

  drawInvoiceHeading(doc, "EXPORT INVOICE");
  drawExportHeaderBoxes(doc, invoiceData);
  drawConsigneeLeft(doc, invoiceData);
  drawBuyerRight(doc, invoiceData);
  drawNotifyLeft(doc, invoiceData);
  drawOriginDestinationRight(doc, invoiceData);
  drawLogisticsGridLeft(doc, invoiceData);
  drawTermsOfDeliveryRight(doc, invoiceData);
  // generateBuyerShipping(doc, invoiceData);
  // generateItemsTable(doc, invoiceData);
  // generateFooter(doc, invoiceData);

  doc.end();
}