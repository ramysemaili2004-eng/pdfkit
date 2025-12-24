export default function drawInvoiceBorder(doc) {
  const { width, height } = doc.page;
  const borderMargin = 12;

  doc
    .lineWidth(1)
    .rect(
      borderMargin,
      borderMargin,
      width - borderMargin * 2,
      height - borderMargin * 2
    )
    .stroke();
}
