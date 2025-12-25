export const PAGE_WIDTH = 595.28;
export const PAGE_HEIGHT = 841.89;
export const MARGIN = 12;
export const CONTENT_WIDTH = PAGE_WIDTH - (MARGIN * 2);

export function drawInvoiceBorder(doc) {
  doc.rect(MARGIN, MARGIN, CONTENT_WIDTH, PAGE_HEIGHT - (MARGIN * 2)).stroke();
}

export function drawBorder(doc, x, y, width, height) {
  doc.rect(x, y, width, height).stroke();
}

export function drawCell(doc, x, y, width, height, text, options = {}) {
  const {
    align = 'left',
    valign = 'top',
    fontSize = 8,
    font = 'Helvetica',
    border = true,
    padding = 2,
    bold = false
  } = options;

  if (border) {
    doc.rect(x, y, width, height).stroke();
  }

  doc.font(bold ? 'Helvetica-Bold' : font).fontSize(fontSize);

  let textX = x + padding;
  let textY = y + padding;

  if (align === 'center') {
    textX = x + (width / 2);
  } else if (align === 'right') {
    textX = x + width - padding;
  }

  if (valign === 'center') {
    textY = y + (height / 2) - (fontSize / 2);
  }

  doc.text(text, textX, textY, {
    width: width - (padding * 2),
    align: align,
    lineBreak: false
  });
}

export function drawLine(doc, x1, y1, x2, y2) {
  doc.moveTo(x1, y1).lineTo(x2, y2).stroke();
}