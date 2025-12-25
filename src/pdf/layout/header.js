import { MARGIN, CONTENT_WIDTH } from '../../utils/format.js';
import { labelBold, valueBold } from '../../utils/typography.js';

export function drawExportHeaderBoxes(doc, data) {
  const startX = MARGIN;
  const startY = MARGIN + 15;

  const totalWidth = CONTENT_WIDTH;
  const totalHeight = 95;

  // TRUE 50–50 SPLIT
  const leftWidth = totalWidth / 2;
  const rightWidth = totalWidth / 2;

  const rightCol1Width = rightWidth / 2;

  const row1Height = 30;
  const row2Height = 30;

  const leftX = startX;
  const rightX = startX + leftWidth;

  // ─────────────────────────────
  // HEADER TOP & BOTTOM BORDERS
  // ─────────────────────────────
  doc.moveTo(startX, startY)
     .lineTo(startX + totalWidth, startY)
     .stroke();

  doc.moveTo(startX, startY + totalHeight)
     .lineTo(startX + totalWidth, startY + totalHeight)
     .stroke();

  // LEFT / RIGHT DIVIDER
  doc.moveTo(rightX, startY)
     .lineTo(rightX, startY + totalHeight)
     .stroke();

  // RIGHT GRID
  doc.moveTo(rightX, startY + row1Height)
     .lineTo(startX + totalWidth, startY + row1Height)
     .stroke();

  doc.moveTo(rightX, startY + row1Height + row2Height)
     .lineTo(startX + totalWidth, startY + row1Height + row2Height)
     .stroke();

  doc.moveTo(rightX + rightCol1Width, startY)
     .lineTo(rightX + rightCol1Width, startY + row1Height)
     .stroke();

  // ─────────────────────────────
  // LEFT — EXPORTER
  // ─────────────────────────────
  let y = startY + 6;

  labelBold(doc);
  doc.text('Exporter', leftX + 6, y);

  y += 10;
  valueBold(doc);
  doc.text(data.exporter.name, leftX + 6, y, { width: leftWidth - 12 });

  y += 12;
  valueBold(doc);
  doc.text('A 51-52, M.I.A.', leftX + 6, y);
  y += 9;
  doc.text('BASNI IInd PHASE,', leftX + 6, y);
  y += 9;
  doc.text('JODHPUR - 342005 (RAJASTHAN)', leftX + 6, y);
  y += 9;
  doc.text(`Email: ${data.exporter.email}`, leftX + 6, y);
  y += 9;
  doc.text(`FACTORY: ${data.exporter.factoryAddress}`, leftX + 6, y);
  y += 9;
  doc.text(`GSTIN : ${data.exporter.gstin}   PAN : ${data.exporter.pan}`, leftX + 6, y);

  // ─────────────────────────────
  // RIGHT — ROW 1
  // ─────────────────────────────
  y = startY + 6;

  labelBold(doc);
  doc.text('Invoice No. & Date', rightX + 6, y);

  valueBold(doc);
  doc.text(
    `${data.invoice.invoiceNumber}      24/10/25`,
    rightX + 6,
    y + 10
  );

  labelBold(doc);
  doc.text(
    "Exporter Ref./Buyer's Order No.",
    rightX + rightCol1Width + 6,
    y
  );

  // ─────────────────────────────
  // RIGHT — ROW 2
  // ─────────────────────────────
  y = startY + row1Height + 6;

  labelBold(doc);
  doc.text('Order No. & Date', rightX + 6, y);

  valueBold(doc);
  doc.text(data.invoice.orderNumber, rightX + 6, y + 10);

  doc.text(
    '15/05/25',
    totalWidth - 80,
    y + 10,
    { align: 'center' }
  );

  // ─────────────────────────────
  // RIGHT — ROW 3
  // ─────────────────────────────
  y = startY + row1Height + row2Height + 6;

  labelBold(doc);
  doc.text('Other Reference (s)', rightX + 6, y);

  valueBold(doc);
  doc.text(data.invoice.iecCode, rightX + 6, y + 10);

  return startY + totalHeight;
}
