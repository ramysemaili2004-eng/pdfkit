export function generateBuyerShipping(doc, invoice) {
  const { buyer } = invoice;

  const startY = 210;
  const leftX = 50;
  const rightX = 330;
  const boxWidth = 495;
  const boxHeight = 130;
  const dividerX = 297;

  const leftTextX = leftX + 5;
  const rightTextX = rightX + 5;
  const textWidth = 235;

  // Outer box
  doc
    .rect(leftX, startY, boxWidth, boxHeight)
    .stroke();

  // Vertical divider
  doc
    .moveTo(dividerX, startY)
    .lineTo(dividerX, startY + boxHeight)
    .stroke();

  // Headings
  doc
    .font('Helvetica-Bold')
    .fontSize(9)
    .text('Customer Details', leftTextX, startY + 5);

  doc
    .text('Shipping Address', rightTextX, startY + 5);

  // Body text style
  doc
    .font('Helvetica')
    .fontSize(9)
    .lineGap(3);

  // LEFT COLUMN: Customer details
  doc
    .text(`Name: ${buyer.name}`, leftTextX, startY + 25, {
      width: textWidth
    })
    .text(`Company: ${buyer.companyName}`, {
      width: textWidth
    })
    .text(`GSTIN: ${buyer.gstin}`, {
      width: textWidth
    })
    .text(buyer.billingAddress.line1, {
      width: textWidth
    })
    .text(buyer.billingAddress.line2, {
      width: textWidth
    })
    .text(
      `${buyer.billingAddress.city}, ${buyer.billingAddress.state} - ${buyer.billingAddress.pincode}`,
      { width: textWidth }
    )
    .text(`Phone: ${buyer.phone}`, {
      width: textWidth
    })
    .text(`Email: ${buyer.email}`, {
      width: textWidth
    });

  // RIGHT COLUMN: Shipping address
  const addr = buyer.billingAddress;

  doc
    .text(addr.line1, rightTextX, startY + 25, {
      width: textWidth
    })
    .text(addr.line2, {
      width: textWidth
    })
    .text(`${addr.city}, ${addr.state}`, {
      width: textWidth
    })
    .text(`Pincode: ${addr.pincode}`, {
      width: textWidth
    });
}
