export function generateFooter(doc, invoice) {
  const { notes, termsAndConditions, footer } = invoice;

  const startY = doc.y + 30;
  const leftX = 50;
  const rightX = 330;
  const width = 235;

  // Top divider line
  doc
    .moveTo(50, startY)
    .lineTo(545, startY)
    .stroke();

  // Notes (left)
  doc
    .font('Helvetica-Bold')
    .fontSize(9)
    .text('Notes:', leftX, startY + 8);

  doc
    .font('Helvetica')
    .fontSize(9)
    .text(notes, leftX, startY + 22, {
      width
    });

  // Terms & Conditions (right)
  doc
    .font('Helvetica-Bold')
    .fontSize(9)
    .text('Terms and Conditions:', rightX, startY + 8);

  doc
    .font('Helvetica')
    .fontSize(9)
    .text(termsAndConditions, rightX, startY + 22, {
      width
    });

  // Bottom section
  const bottomY = startY + 80;

  // Page info + digitally signed text
  doc
    .fontSize(8)
    .text(`Page ${footer.page}`, leftX, bottomY);

  doc
    .text('This is a digitally signed document.', leftX, bottomY + 12);

  // Signature (right aligned)
  doc
    .font('Helvetica-Bold')
    .fontSize(9)
    .text(footer.signature, rightX, bottomY + 20, {
      width,
      align: 'right'
    });
}
