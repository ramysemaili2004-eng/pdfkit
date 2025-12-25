// Base text for whole document
export function baseText(doc) {
  doc.font('Courier').fontSize(8);
}


// Bold labels
export function labelBold(doc) {
  doc.font('Courier-Bold').fontSize(7);
}

// Prominent values (company name etc.)
export function valueBold(doc) {
  doc.font('Courier-Bold').fontSize(8);
}
