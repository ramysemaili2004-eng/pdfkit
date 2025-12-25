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

export function drawConsigneeLeft(doc, data) {
  const startX = MARGIN;

  // 👇 Start exactly below header
  const startY = MARGIN + 15 + 95;

  const totalWidth = CONTENT_WIDTH;
  const sectionHeight = 75;

  // TRUE 50–50
  const halfWidth = totalWidth / 2;
  const leftX = startX;
  const rightX = startX + halfWidth;

  // ─────────────────────────────
  // SECTION TOP & BOTTOM BORDERS
  // ─────────────────────────────
  doc.moveTo(startX, startY)
     .lineTo(startX + totalWidth, startY)
     .stroke();

  doc.moveTo(startX, startY + sectionHeight)
     .lineTo(startX + totalWidth, startY + sectionHeight)
     .stroke();

  // ─────────────────────────────
  // VERTICAL DIVIDER (50%)
  // ─────────────────────────────
  doc.moveTo(rightX, startY)
     .lineTo(rightX, startY + sectionHeight)
     .stroke();

  // ─────────────────────────────
  // LEFT — CONSIGNEE
  // ─────────────────────────────
  let y = startY + 6;

  labelBold(doc);
  doc.text('Consignee', leftX + 6, y);

  y += 10;
  valueBold(doc);
  doc.text(
    data.consignee.name,
    leftX + 6,
    y,
    { width: halfWidth - 12 }
  );

  y += 12;
  valueBold(doc);
  doc.text(data.consignee.address.line1, leftX + 6, y);

  if (data.consignee.address.line2) {
    y += 9;
    doc.text(data.consignee.address.line2, leftX + 6, y);
  }

  y += 9;
  doc.text(
    `${data.consignee.address.city}, ${data.consignee.address.pincode}`,
    leftX + 6,
    y
  );

  y += 9;
  doc.text(data.consignee.address.country, leftX + 6, y);

  return startY + sectionHeight;
}

export function drawBuyerRight(doc, data) {
  const startX = MARGIN;

  // Must start at SAME Y as Consignee section
  const startY = MARGIN + 15 + 95; // header end

  const totalWidth = CONTENT_WIDTH;
  const sectionHeight = 75;

  // TRUE 50–50
  const halfWidth = totalWidth / 2;
  const rightX = startX + halfWidth;

  // ─────────────────────────────
  // RIGHT — BUYER (IF OTHER THAN CONSIGNEE)
  // ─────────────────────────────
  let y = startY + 6;

  labelBold(doc);
  doc.text(
    'Buyer (if other than consignee)',
    rightX + 6,
    y,
    { width: halfWidth - 12 }
  );

  // Buyer details are optional
  if (!data.buyer) {
    return startY + sectionHeight;
  }

  y += 12;
  valueBold(doc);
  doc.text(
    data.buyer.name,
    rightX + 6,
    y,
    { width: halfWidth - 12 }
  );

  y += 12;
  valueBold(doc);
  doc.text(data.buyer.address.line1, rightX + 6, y);

  if (data.buyer.address.line2) {
    y += 9;
    doc.text(data.buyer.address.line2, rightX + 6, y);
  }

  y += 9;
  doc.text(
    `${data.buyer.address.city}, ${data.buyer.address.pincode}`,
    rightX + 6,
    y
  );

  y += 9;
  doc.text(data.buyer.address.country, rightX + 6, y);

  return startY + sectionHeight;
}

export function drawNotifyLeft(doc, data) {
  const startX = MARGIN;

  // Starts BELOW Consignee/Buyer section
  const startY = MARGIN + 15 + 95 + 75;

  const totalWidth = CONTENT_WIDTH;
  const sectionHeight = 70;

  const halfWidth = totalWidth / 2;
  const leftX = startX;
  const rightX = startX + halfWidth;

  // Top & bottom border
  doc.moveTo(startX, startY)
     .lineTo(startX + totalWidth, startY)
     .stroke();

  doc.moveTo(startX, startY + sectionHeight)
   .lineTo(startX + totalWidth / 2, startY + sectionHeight)
   .stroke();

  // Vertical divider
  doc.moveTo(rightX, startY)
     .lineTo(rightX, startY + sectionHeight)
     .stroke();

  // LEFT — Notify
  let y = startY + 6;

  labelBold(doc);
  doc.text('Notify', leftX + 6, y);

  y += 10;
  valueBold(doc);
  doc.text(data.buyer.name, leftX + 6, y, { width: halfWidth - 12 });

  y += 12;
  valueBold(doc);
  doc.text(data.buyer.address.line1, leftX + 6, y);

  if (data.buyer.address.line2) {
    y += 9;
    doc.text(data.buyer.address.line2, leftX + 6, y);
  }

  y += 9;
  doc.text(
    `${data.buyer.address.city}, ${data.buyer.address.pincode}`,
    leftX + 6,
    y
  );

  return startY + sectionHeight;
}

export function drawOriginDestinationRight(doc, data) {
  const startX = MARGIN;

  // SAME Y as Notify section start
  const startY = MARGIN + 15 + 95 + 75;

  const totalWidth = CONTENT_WIDTH;
  const halfWidth = totalWidth / 2;
  const rightX = startX + halfWidth;

  // 👇 SHORTER HEIGHT (as per image)
  const sectionHeight = 35;
  const smallBoxWidth = halfWidth / 2;

  // ─────────────────────────────
  // BORDERS (RIGHT HALF ONLY)
  // ─────────────────────────────

  // Bottom border ONLY (top is already drawn by Notify row)
  doc.moveTo(rightX, startY + sectionHeight)
     .lineTo(startX + totalWidth, startY + sectionHeight)
     .stroke();

  // Vertical divider between Origin & Final Destination
  doc.moveTo(rightX + smallBoxWidth, startY)
     .lineTo(rightX + smallBoxWidth, startY + sectionHeight)
     .stroke();

  // ─────────────────────────────
  // CONTENT
  // ─────────────────────────────
  let y = startY + 6;

  // Country of Origin
  labelBold(doc);
  doc.text('Country of Origin of Goods', rightX + 6, y);

  valueBold(doc);
  doc.text(
    data.shipment.countryOfOrigin,
    rightX + 6,
    y + 12
  );

  // Country of Final Destination
  labelBold(doc);
  doc.text(
    'Country of Final Destination',
    rightX + smallBoxWidth + 6,
    y
  );

  valueBold(doc);
  doc.text(
    data.shipment.countryOfFinalDestination,
    rightX + smallBoxWidth + 6,
    y + 12
  );

  return startY + sectionHeight;
}

export function drawLogisticsGridLeft(doc, data) {
  const startX = MARGIN;

  // Starts BELOW Notify section (same as before)
  const startY = MARGIN + 15 + 95 + 75 + 70;

  const totalWidth = CONTENT_WIDTH;
  const halfWidth = totalWidth / 2;

  const rowHeight = 30;
  const rowsCount = 3;
  const sectionHeight = rowHeight * rowsCount;

  // ─────────────────────────────
  // LEFT 50% — OUTER BORDER
  // ─────────────────────────────
  doc
    .moveTo(startX, startY)
    .lineTo(startX + halfWidth, startY)
    .stroke();

  doc
    .moveTo(startX, startY + sectionHeight)
    .lineTo(startX + halfWidth, startY + sectionHeight)
    .stroke();

  // RIGHT BORDER of LEFT HALF ✅
  doc
    .moveTo(startX + halfWidth, startY)
    .lineTo(startX + halfWidth, startY + sectionHeight)
    .stroke();

  // Horizontal row lines (inside left half)
  for (let i = 1; i < rowsCount; i++) {
    doc
      .moveTo(startX, startY + i * rowHeight)
      .lineTo(startX + halfWidth, startY + i * rowHeight)
      .stroke();
  }

  // Vertical split inside LEFT half (2 columns)
  const innerColX = startX + halfWidth / 2;
  doc
    .moveTo(innerColX, startY)
    .lineTo(innerColX, startY + sectionHeight)
    .stroke();

  // ─────────────────────────────
  // CONTENT (LEFT HALF ONLY)
  // ─────────────────────────────
  const rows = [
    ["Pre-Carriage by", data.invoice.shipmentMode],
    ["Place of Receipt by Pre-carrier", data.invoice.placeOfReceipt],

    ["Vessel / Flight No.", data.invoice.vessel || ""],
    ["Port of Loading", data.invoice.portOfLoading],

    ["Port of Discharge", data.shipment.portOfDischarge || ""],
    ["Final Destination", data.invoice.finalDestination],
  ];

  let y = startY + 6;

  for (let i = 0; i < rows.length; i++) {
    const colX = i % 2 === 0 ? startX + 6 : innerColX + 6;

    labelBold(doc);
    doc.text(rows[i][0], colX, y);

    valueBold(doc);
    doc.text(rows[i][1], colX, y + 10);

    if (i % 2 === 1) {
      y += rowHeight;
    }
  }

  return startY + sectionHeight;
}

export function drawTermsOfDeliveryRight(doc, data) {
  const startX = MARGIN;

  const startY = MARGIN + 15 + 95 + 75 + 35;

  const totalWidth = CONTENT_WIDTH;
  const halfWidth = totalWidth / 2;
  const rightX = startX + halfWidth;

  // 🔑 INCREASED HEIGHT (this fixes the break)
  const termsHeight = 110;

  const endY = startY + 125;

  // ─────────────────────────────
  // BORDERS
  // ─────────────────────────────

  doc.moveTo(rightX, endY)
     .lineTo(startX + totalWidth, endY)
     .stroke();

  // ─────────────────────────────
  // CONTENT
  // ─────────────────────────────
  labelBold(doc);
  doc.text(
    'Terms of Delivery and Payment',
    rightX + 6,
    startY + 6,
    { width: halfWidth - 12 }
  );

  // Start flowing text safely below heading
  doc.y = startY + 22;

  valueBold(doc);

  doc.text(
    `SHIPMENT IS ${data.invoice.shipmentTerms}`,
    rightX + 6,
    doc.y,
    { width: halfWidth - 12 }
  );

  doc.text(
    `SHIPMENT BY ${data.invoice.shipmentMode}`,
    rightX + 6,
    doc.y,
    { width: halfWidth - 12 }
  );

  doc.text(
    `CONTAINER IS ${data.invoice.containerType}`,
    rightX + 6,
    doc.y,
    { width: halfWidth - 12 }
  );

  // ─────────────────────────────
  // PAYMENT TERMS (ALWAYS SAFE)
  // ─────────────────────────────
  labelBold(doc);
  doc.text(
    `PAYMENT TERMS : ${data.invoice.paymentTerms}`,
    rightX + 6,
    endY - 18,
    { width: halfWidth - 12 }
  );

  return endY;
}
