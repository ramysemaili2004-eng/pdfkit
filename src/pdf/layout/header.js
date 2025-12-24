export function generateHeader(doc, invoice) {
  const { invoiceType, copyType, seller, invoiceDetails } = invoice;

  // Top title
  doc
    .fontSize(10)
    .fillColor('green')
    .text(invoiceType, 50, 40, { align: 'center' });

  doc
    .fillColor('black')
    .fontSize(8)
    .text(copyType, 450, 40);

  // Seller logo / name
  doc
    .fontSize(18)
    .text(seller.brandName, 50, 70);

  doc
    .fontSize(9)
    .text(`GSTIN: ${seller.gstin}`)
    .text(seller.address.line1)
    .text(seller.address.line2)
    .text(
      `${seller.address.city}, ${seller.address.state} - ${seller.address.pincode}`
    )
    .text(`Mobile: ${seller.mobile}`)
    .text(`Email: ${seller.email}`);

  // Invoice meta (right side)
  doc
    .fontSize(9)
    .text(`Invoice #: ${invoiceDetails.invoiceNumber}`, 330, 70)
    .text(`Invoice Date: ${invoiceDetails.invoiceDate}`)
    .text(`Place of Supply: ${invoiceDetails.placeOfSupply}`)
    .text(`IRN: ${invoiceDetails.irn}`, {
      width: 200
    });

  // Divider
  doc
    .moveTo(50, 200)
    .lineTo(545, 200)
    .stroke();
}
