const Facture = require('../model/factureModel');

exports.saleHistory = async (req, res) => {
    try {
        const factures = await Facture.find().sort({ date: -1, customer: 1 });
        res.status(200).json({ message: factures });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}
