import { PAGE_WIDTH, MARGIN, CONTENT_WIDTH, drawBorder, drawLine, PAGE_HEIGHT } from '../../utils/format.js';

export function generateItemsTable(doc, data) {
  let currentY = doc.y;

  // Table header
  const headerHeight = 20;
  const col1Width = 280;
  const col2Width = 60;
  const col3Width = 60;
  const col4Width = CONTENT_WIDTH - col1Width - col2Width - col3Width;

  drawBorder(doc, MARGIN, currentY, CONTENT_WIDTH, headerHeight);
  drawLine(doc, MARGIN + col1Width, currentY, MARGIN + col1Width, currentY + headerHeight);
  drawLine(doc, MARGIN + col1Width + col2Width, currentY, MARGIN + col1Width + col2Width, currentY + headerHeight);
  drawLine(doc, MARGIN + col1Width + col2Width + col3Width, currentY, MARGIN + col1Width + col2Width + col3Width, currentY + headerHeight);

  // Header labels
  let yPos = currentY + 3;
  doc.fontSize(7).font('Helvetica-Bold')
    .text('Description of Goods', MARGIN + 2, yPos, { width: col1Width - 4, align: 'center' })
    .text('Quantity', MARGIN + col1Width + 2, yPos, { width: col2Width - 4, align: 'center' })
    .text('Rate', MARGIN + col1Width + col2Width + 2, yPos, { width: col3Width - 4, align: 'center' })
    .text('Amount', MARGIN + col1Width + col2Width + col3Width + 2, yPos, { width: col4Width - 4, align: 'center' });

  doc.fontSize(6).font('Helvetica')
    .text('Buyer Code    Mfg #    OCN #', MARGIN + 2, yPos + 10, { width: col1Width - 4 })
    .text('PCS / SET', MARGIN + col1Width + 2, yPos + 10, { width: col2Width - 4, align: 'center' })
    .text('US $', MARGIN + col1Width + col2Width + 2, yPos + 10, { width: col3Width - 4, align: 'center' })
    .text('US $', MARGIN + col1Width + col2Width + col3Width + 2, yPos + 10, { width: col4Width - 4, align: 'center' });

  currentY += headerHeight;

  // Table rows
  const rowHeight = 30;
  data.items.forEach((item, index) => {
    if (currentY + rowHeight > PAGE_HEIGHT - MARGIN - 100) {
      doc.addPage();
      currentY = MARGIN + 20;
    }

    drawBorder(doc, MARGIN, currentY, CONTENT_WIDTH, rowHeight);
    drawLine(doc, MARGIN + col1Width, currentY, MARGIN + col1Width, currentY + rowHeight);
    drawLine(doc, MARGIN + col1Width + col2Width, currentY, MARGIN + col1Width + col2Width, currentY + rowHeight);
    drawLine(doc, MARGIN + col1Width + col2Width + col3Width, currentY, MARGIN + col1Width + col2Width + col3Width, currentY + rowHeight);

    yPos = currentY + 2;
    doc.fontSize(7).font('Helvetica-Bold')
      .text(item.description, MARGIN + 2, yPos, { width: col1Width - 4 });
    
    doc.fontSize(6).font('Helvetica')
      .text(`(36x36x1)`, MARGIN + 2, yPos + 9)
      .text(`HSN: ${item.hsn}`, MARGIN + 2, yPos + 17);

    doc.fontSize(7)
      .text(`${item.buyerCode}    ${item.articleCode}`, MARGIN + 2, yPos + 25);

    doc.fontSize(8).font('Helvetica')
      .text(`PCS ${item.quantityPcs}`, MARGIN + col1Width + 2, yPos + 12, { width: col2Width - 4, align: 'center' })
      .text(item.rateUSD.toFixed(2), MARGIN + col1Width + col2Width + 2, yPos + 12, { width: col3Width - 4, align: 'center' })
      .text(item.amountUSD.toFixed(2), MARGIN + col1Width + col2Width + col3Width + 2, yPos + 12, { width: col4Width - 4, align: 'right' });

    doc.fontSize(6).font('Helvetica')
      .text(item.poNumber, MARGIN + 2, currentY + rowHeight - 8);

    currentY += rowHeight;
  });

  // Total row
  const totalRowHeight = 15;
  drawBorder(doc, MARGIN, currentY, CONTENT_WIDTH, totalRowHeight);
  drawLine(doc, MARGIN + col1Width, currentY, MARGIN + col1Width, currentY + totalRowHeight);
  drawLine(doc, MARGIN + col1Width + col2Width, currentY, MARGIN + col1Width + col2Width, currentY + totalRowHeight);
  drawLine(doc, MARGIN + col1Width + col2Width + col3Width, currentY, MARGIN + col1Width + col2Width + col3Width, currentY + totalRowHeight);

  yPos = currentY + 4;
  doc.fontSize(8).font('Helvetica-Bold')
    .text('TOTAL C/F', MARGIN + 2, yPos)
    .text(data.totals.totalQuantityPcs.toString(), MARGIN + col1Width + 2, yPos, { width: col2Width - 4, align: 'center' })
    .text(data.totals.itemsTotalUSD.toFixed(2), MARGIN + col1Width + col2Width + col3Width + 2, yPos, { width: col4Width - 4, align: 'right' });

  currentY += totalRowHeight;

  return currentY;
}