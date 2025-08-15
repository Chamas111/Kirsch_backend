const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema(
  {
    auftragId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Auftrag",
    },
    rechnungsNummer: { type: String, required: true },
    kundeName: { type: String, required: true },
    status: { type: String, required: true },
    rechnungsDatum: { type: Date, required: true },
    nettoBetrag: { type: Number, required: true },
    mwst: { type: Number },
    brutto: { type: Number },
  },
  { timestamps: true }
);

const Invoice = mongoose.model("Invoice", invoiceSchema);
module.exports = Invoice;
