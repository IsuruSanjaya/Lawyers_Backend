const Lawyer = require('../models/Lawyers');

const createLawyer = async (data) => {
  const lawyer = new Lawyer(data);
  return await lawyer.save();
};

const incrementProfileClick = async (lawyerId) => {
  return await Lawyer.findOneAndUpdate(
    { lawyerId },
    { $inc: { profileClick: 1 }, $set: { timestamp: new Date() } },
    { new: true, upsert: true } // creates document if not exists
  );
};

const incrementProfileView = async (lawyerId) => {
  return await Lawyer.findOneAndUpdate(
    { lawyerId },
    { $inc: { profileView: 1 }, $set: { timestamp: new Date() } },
    { new: true, upsert: true } // creates document if not exists
  );
};
const incrementChatStarted = async (lawyerId) => {
  return await Lawyer.findOneAndUpdate(
    { lawyerId },
    { 
      $inc: { chatStarted: 1 }, 
      $set: { timestamp: new Date(), messageSent: false } 
    },
    { new: true, upsert: true }
  );
};


module.exports = {
  createLawyer,
  incrementProfileClick,
  incrementProfileView,
  incrementChatStarted,
};
