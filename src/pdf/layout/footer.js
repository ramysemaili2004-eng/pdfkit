import { PAGE_WIDTH, MARGIN, CONTENT_WIDTH, drawBorder } from '../../utils/format.js';

export function generateFooter(doc, data) {
  let currentY = doc.y;

  // Summary section
  const summaryHeight = 50;
  drawBorder(doc, MARGIN, currentY, CONTENT_WIDTH, summaryHeight);

  let yPos = currentY + 5;
  doc.fontSize(8).font('Helvetica')
    .text(`TOTAL B/F`, MARGIN + 5, yPos)
    .text(data.totals.totalQuantityPcs.toString(), MARGIN + 300, yPos)
    .text(data.totals.itemsTotalUSD.toFixed(2), MARGIN + 400, yPos, { align: 'right' });

  yPos += 12;
  doc.text(`ADD : INSPECTION CHARGES US $`, MARGIN + 5, yPos)
    .text(data.totals.inspectionChargesUSD.toFixed(2), MARGIN + 400, yPos, { align: 'right' });

  yPos += 12;
  doc.fontSize(9).font('Helvetica-Bold')
    .text(`TOTAL FOB US $`, MARGIN + 5, yPos)
    .text(data.totals.totalFOBUSD.toFixed(2), MARGIN + 400, yPos, { align: 'right' });

  yPos += 12;
  doc.fontSize(7).font('Helvetica-Bold')
    .text(`FOB US $ ${data.totals.amountInWords}`, MARGIN + 5, yPos);

  currentY += summaryHeight;

  // Declaration section
  const declarationHeight = 60;
  drawBorder(doc, MARGIN, currentY, CONTENT_WIDTH, declarationHeight);

  yPos = currentY + 5;
  doc.fontSize(7).font('Helvetica-Bold')
    .text('Declaration:', MARGIN + 5, yPos);

  yPos += 10;
  doc.fontSize(7).font('Helvetica')
    .text(data.declaration.text, MARGIN + 5, yPos, { width: CONTENT_WIDTH - 10 });

  yPos += 20;
  doc.fontSize(8).font('Helvetica-Bold')
    .text(`FOR ${data.exporter.name}`, MARGIN + 5, yPos);

  yPos += 20;
  doc.fontSize(7).font('Helvetica')
    .text('Signature & Date', MARGIN + 5, yPos)
    .text('Auth. Signatory', MARGIN + 5, yPos + 10);

  currentY += declarationHeight;

  // Final notes
  yPos = currentY + 5;
  doc.fontSize(7).font('Helvetica-Bold')
    .text(`"WE INTEND TO CLAIM REWARDS UNDER ${data.declaration.rewardScheme} SCHEME"`, MARGIN + 5, yPos)
    .text(`SUBJECT TO ${data.declaration.jurisdiction} JURISDICTION ONLY`, MARGIN + 5, yPos + 10);

  // Weight information
  doc.fontSize(7).font('Helvetica')
    .text(`Net Weight ${data.shipment.netWeightKg}`, PAGE_WIDTH - MARGIN - 150, yPos)
    .text(`Gross Weight ${data.shipment.grossWeightKg}`, PAGE_WIDTH - MARGIN - 150, yPos + 10);

  return currentY;
}