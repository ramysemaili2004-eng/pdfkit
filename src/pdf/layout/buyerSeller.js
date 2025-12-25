import { PAGE_WIDTH, MARGIN, CONTENT_WIDTH, drawBorder, drawLine } from '../../utils/format.js';

export function drawConsigneeHeaderBox(doc, data) {
  let currentY = doc.y;

  // Buyer section
  const buyerBoxHeight = 40;
  drawBorder(doc, MARGIN, currentY, CONTENT_WIDTH, buyerBoxHeight);

  let yPos = currentY + 3;
  doc
    .fontSize(7)
    .font('Helvetica-Bold')
    .text('Buyer (if other than consignee)', MARGIN + 3, yPos);

  yPos += 10;
  doc
    .fontSize(8)
    .font('Helvetica-Bold')
    .text(data.buyer.name, MARGIN + 3, yPos);

  yPos += 10;
  doc
    .fontSize(7)
    .font('Helvetica')
    .text(data.buyer.address.line1, MARGIN + 3, yPos)
    .text(data.buyer.address.line2 || '', MARGIN + 3, yPos + 9);

  currentY += buyerBoxHeight;

  // Shipping details section
  const shippingBoxHeight = 50;
  const col1Width = 140;
  const col2Width = 140;
  const col3Width = CONTENT_WIDTH - col1Width - col2Width;

  drawBorder(doc, MARGIN, currentY, CONTENT_WIDTH, shippingBoxHeight);
  drawLine(doc, MARGIN + col1Width, currentY, MARGIN + col1Width, currentY + shippingBoxHeight);
  drawLine(doc, MARGIN + col1Width + col2Width, currentY, MARGIN + col1Width + col2Width, currentY + shippingBoxHeight);

  // Column 1
  yPos = currentY + 2;
  doc.fontSize(6).font('Helvetica-Bold').text('Pre-Carriage by', MARGIN + 2, yPos);
  doc.fontSize(7).font('Helvetica').text('BY ROAD', MARGIN + 2, yPos + 8);
  
  doc.fontSize(6).font('Helvetica-Bold').text('Vessel/Flight No.', MARGIN + 2, yPos + 18);
  doc.fontSize(7).font('Helvetica').text('', MARGIN + 2, yPos + 26);
  
  doc.fontSize(6).font('Helvetica-Bold').text('Port of Discharge', MARGIN + 2, yPos + 34);
  doc.fontSize(7).font('Helvetica').text(data.invoice.portOfLoading, MARGIN + 2, yPos + 42);

  // Column 2
  doc.fontSize(6).font('Helvetica-Bold').text('Place of Receipt by Pre-carrier', MARGIN + col1Width + 2, yPos);
  doc.fontSize(7).font('Helvetica').text(data.invoice.placeOfReceipt, MARGIN + col1Width + 2, yPos + 8);
  
  doc.fontSize(6).font('Helvetica-Bold').text('Port of Loading', MARGIN + col1Width + 2, yPos + 18);
  doc.fontSize(7).font('Helvetica').text(data.invoice.portOfLoading, MARGIN + col1Width + 2, yPos + 26);
  
  doc.fontSize(6).font('Helvetica-Bold').text('Final Destination', MARGIN + col1Width + 2, yPos + 34);
  doc.fontSize(7).font('Helvetica').text(data.invoice.finalDestination, MARGIN + col1Width + 2, yPos + 42);

  // Column 3 - Notify and country details
  doc.fontSize(6).font('Helvetica-Bold').text('Notify', MARGIN + col1Width + col2Width + 2, yPos);
  doc.fontSize(7).font('Helvetica').text(data.buyer.address.line1, MARGIN + col1Width + col2Width + 2, yPos + 8, { width: col3Width - 4 });

  doc.fontSize(6).font('Helvetica-Bold').text('Country of Origin of Goods', MARGIN + col1Width + col2Width + 2, yPos + 25);
  doc.fontSize(7).font('Helvetica').text(data.shipment.countryOfOrigin, MARGIN + col1Width + col2Width + 2, yPos + 33);

  currentY += shippingBoxHeight;

  // Terms and marks section
  const termsBoxHeight = 30;
  drawBorder(doc, MARGIN, currentY, CONTENT_WIDTH, termsBoxHeight);
  drawLine(doc, MARGIN + col1Width + col2Width, currentY, MARGIN + col1Width + col2Width, currentY + termsBoxHeight);

  yPos = currentY + 2;
  doc.fontSize(6).font('Helvetica-Bold').text('Terms of Delivery and Payment', MARGIN + 2, yPos);
  doc.fontSize(7).font('Helvetica')
    .text(`SHIPMENT IS ${data.invoice.shipmentTerms}`, MARGIN + 2, yPos + 10)
    .text(`PAYMENT TERMS : ${data.invoice.paymentTerms}`, MARGIN + 2, yPos + 18);

  doc.fontSize(6).font('Helvetica-Bold').text('Country of Final Destination', MARGIN + col1Width + col2Width + 2, yPos);
  doc.fontSize(7).font('Helvetica').text(data.shipment.countryOfFinalDestination, MARGIN + col1Width + col2Width + 2, yPos + 8);

  currentY += termsBoxHeight;

  // Marks and packages section
  const marksBoxHeight = 35;
  const marksCol1 = 80;
  const marksCol2 = 100;
  const marksCol3 = CONTENT_WIDTH - marksCol1 - marksCol2;

  drawBorder(doc, MARGIN, currentY, CONTENT_WIDTH, marksBoxHeight);
  drawLine(doc, MARGIN + marksCol1, currentY, MARGIN + marksCol1, currentY + marksBoxHeight);
  drawLine(doc, MARGIN + marksCol1 + marksCol2, currentY, MARGIN + marksCol1 + marksCol2, currentY + marksBoxHeight);

  yPos = currentY + 2;
  doc.fontSize(6).font('Helvetica-Bold').text('Marks & Nos.', MARGIN + 2, yPos);
  doc.fontSize(7).font('Helvetica').text(data.shipment.marksAndNumbers, MARGIN + 2, yPos + 10);

  doc.fontSize(6).font('Helvetica-Bold').text('No. & Kind of Pkgs.', MARGIN + marksCol1 + 2, yPos);
  doc.fontSize(7).font('Helvetica')
    .text(`${data.shipment.numberOfPackages} PKGS`, MARGIN + marksCol1 + 2, yPos + 10)
    .text(`SHIPMENT BY ${data.invoice.shipmentMode}`, MARGIN + marksCol1 + 2, yPos + 18)
    .text(`CONTAINER IS ${data.invoice.containerType}`, MARGIN + marksCol1 + 2, yPos + 26);

  doc.fontSize(6).font('Helvetica-Bold').text('Container No.', MARGIN + marksCol1 + marksCol2 + 2, yPos);

  currentY += marksBoxHeight;

  return currentY;
}