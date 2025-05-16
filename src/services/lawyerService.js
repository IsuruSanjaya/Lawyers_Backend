const Lawyer = require('../models/Lawyers');
const { updateDailyStats } = require('../utils/statsUtils');


const createLawyer = async (data) => {
  const lawyer = new Lawyer(data);
  return await lawyer.save();
};

const incrementProfileClick = async (lawyerId) => {
  const lawyer = await Lawyer.findOne({ lawyerId });
  if (!lawyer) throw new Error("Lawyer not found");

  lawyer.profileClick += 1;
  lawyer.timestamp = new Date();
  updateDailyStats(lawyer, 'profileClick');

  await lawyer.save();
  return lawyer;
};

const incrementProfileView = async (lawyerId) => {
  const lawyer = await Lawyer.findOne({ lawyerId });
  if (!lawyer) throw new Error("Lawyer not found");

  lawyer.profileView += 1;
  lawyer.timestamp = new Date();
  updateDailyStats(lawyer, 'profileView');

  await lawyer.save();
  return lawyer;
};

const incrementChatStarted = async (lawyerId) => {
  const lawyer = await Lawyer.findOne({ lawyerId });
  if (!lawyer) throw new Error("Lawyer not found");

  lawyer.chatStarted += 1;
  lawyer.timestamp = new Date();
  lawyer.messageSent = false;
  updateDailyStats(lawyer, 'chatStarted');

  await lawyer.save();
  return lawyer;
};


module.exports = {
  createLawyer,
  incrementProfileClick,
  incrementProfileView,
  incrementChatStarted,
  updateDailyStats
};
