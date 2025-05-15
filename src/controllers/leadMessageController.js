const Lawyer = require('../models/Lawyers');

// Add a new lead
exports.addLead = async (req, res) => {
  try {
    const { lawyerId } = req.params;
    const { leadId, assignedAt } = req.body;

    const updatedLawyer = await Lawyer.findOneAndUpdate(
      { lawyerId },
      { $push: { leads: { leadId, assignedAt } } },
      { new: true, upsert: true }
    );

    res.status(200).json(updatedLawyer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add a new message
exports.addMessage = async (req, res) => {
  try {
    const { lawyerId } = req.params;
    const { leadId, sentAt } = req.body;

    const updatedLawyer = await Lawyer.findOneAndUpdate(
      { lawyerId },
      { $push: { messages: { leadId, sentAt } } },
      { new: true, upsert: true }
    );

    res.status(200).json(updatedLawyer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
