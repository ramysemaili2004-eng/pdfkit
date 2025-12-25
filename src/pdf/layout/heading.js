import { PAGE_WIDTH, MARGIN } from '../../utils/format.js';
import { labelBold } from '../../utils/typography.js';

export function drawInvoiceHeading(doc, headingText) {
  const paddingY = 5;
  const headingY = MARGIN + paddingY;
  const textWidth = PAGE_WIDTH - (MARGIN * 2) - 10;

  // Set font BEFORE measuring
  labelBold(doc);

  // Draw heading text
  doc.text(headingText, MARGIN + 5, headingY, {
    width: textWidth,
    align: 'center'
  });
}
