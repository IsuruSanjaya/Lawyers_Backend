const mongoose = require("mongoose");
const LeadSchema = new mongoose.Schema({
  leadId: String,
  assignedAt: Date,
  // add other lead-related fields if needed
});

const MessageSchema = new mongoose.Schema({
  leadId: String,
  sentAt: Date,
  // add other message-related fields if needed
});

const dailyStatsSchema = new mongoose.Schema({
  date: { type: Date, required: true }, // exact date (not just day name)
  profileClick: { type: Number, default: 0 },
  profileView: { type: Number, default: 0 },
  chatStarted: { type: Number, default: 0 },
  messageSent: { type: Boolean, default: false },
});

const lawyerSchema = new mongoose.Schema({
  lawyerId: { type: String, required: true, unique: true },
  lawyersName: { type: String, required: true },
  contact: { type: String },
  profileClick: { type: Number, default: 0 },
  profileView: { type: Number, default: 0 },
  leads: [LeadSchema], // Array of lead objects
  messages: [MessageSchema], // Array of message objects
  lead_assigned: { type: String, default: null }, // e.g., lead ID
  chatStarted: { type: Number, default: 0 },
  timestamp: { type: Date, default: Date.now },
  blogPublished: { type: Boolean, default: false },
  searchAppearance: { type: Boolean, default: false },
  messageSent: {
    type: Boolean,
    default: false,
  },
  sessionId: { type: String },
    dailyStats: [dailyStatsSchema], // NEW FIELD

});

module.exports = mongoose.model("Lawyer", lawyerSchema);
