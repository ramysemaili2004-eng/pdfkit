export function generateItemsTable(doc, invoice) {
  const { items, summary } = invoice;

  const startX = 50;
  let startY = 360; // below buyer/shipping section
  const rowHeight = 22;
  const bottomMargin = 750; // page bottom limit

  const columns = [
    { label: '#', key: 'srNo', width: 30, align: 'left' },
    { label: 'Item', key: 'description', width: 150, align: 'left' },
    { label: 'HSN/SAC', key: 'hsnSac', width: 60, align: 'left' },
    { label: 'Tax', key: 'taxRate', width: 40, align: 'right' },
    { label: 'Qty', key: 'quantity', width: 35, align: 'right' },
    { label: 'Rate', key: 'rate', width: 60, align: 'right' },
    { label: 'Per', key: 'unit', width: 40, align: 'left' },
    { label: 'Amount', key: 'totalAmount', width: 80, align: 'right' }
  ];

  function drawTableHeader(y) {
    let x = startX;

    doc.font('Helvetica-Bold').fontSize(9);

    columns.forEach(col => {
      doc.rect(x, y, col.width, rowHeight).stroke();
      doc.text(col.label, x + 4, y + 6, {
        width: col.width - 8,
        align: col.align
      });
      x += col.width;
    });

    doc.font('Helvetica').fontSize(9);
  }

  function drawRow(row, y) {
    let x = startX;

    columns.forEach(col => {
      doc.rect(x, y, col.width, rowHeight).stroke();

      let value = row[col.key];

      if (col.key === 'taxRate') value = `${value}%`;
      if (typeof value === 'number') value = value.toFixed(2);

      doc.text(String(value ?? ''), x + 4, y + 6, {
        width: col.width - 8,
        align: col.align
      });

      x += col.width;
    });
  }

  // Initial header
  drawTableHeader(startY);
  startY += rowHeight;

  // Rows with pagination
  items.forEach(item => {
    if (startY + rowHeight > bottomMargin) {
      doc.addPage();
      startY = 50;
      drawTableHeader(startY);
      startY += rowHeight;
    }

    drawRow(item, startY);
    startY += rowHeight;
  });

  // Totals section
  startY += 15;

  if (startY + 60 > bottomMargin) {
    doc.addPage();
    startY = 50;
  }

  const labelX = 330;
  const valueX = 430;
  const valueWidth = 115;

  doc.font("Helvetica-Bold").fontSize(9);

  doc.text("Taxable Amount", labelX, startY);
  doc.text(`₹${summary.taxableAmount.toFixed(2)}`, valueX, startY, {
    width: valueWidth,
    align: "right",
  });

  startY += 14;

  doc.text("IGST", labelX, startY);
  doc.text(`₹${summary.totalIGST.toFixed(2)}`, valueX, startY, {
    width: valueWidth,
    align: "right",
  });

  startY += 18;

  doc.fontSize(10);
  doc.text("Total", labelX, startY);
  doc.text(`₹${summary.grandTotal.toFixed(2)}`, valueX, startY, {
    width: valueWidth,
    align: "right",
  });

  doc.font("Helvetica").fontSize(9);
}
