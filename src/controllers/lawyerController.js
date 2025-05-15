const lawyerService = require('../services/lawyerService');

const createLawyer = async (req, res) => {
  try {
    const lawyer = await lawyerService.createLawyer(req.body);
    res.status(201).json(lawyer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const profileClick = async (req, res) => {
  try {
    const { lawyerId } = req.params;
    const updatedLawyer = await lawyerService.incrementProfileClick(lawyerId);
    res.status(200).json(updatedLawyer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const profileView = async (req, res) => {
  try {
    const { lawyerId } = req.params;
    const updatedLawyer = await lawyerService.incrementProfileView(lawyerId);
    res.status(200).json(updatedLawyer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const chatStarted = async (req, res) => {
  try {
    const { lawyerId } = req.params;
    const updatedLawyer = await lawyerService.incrementChatStarted(lawyerId);
    res.status(200).json(updatedLawyer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createLawyer,
  profileClick,
  profileView,
  chatStarted
};
