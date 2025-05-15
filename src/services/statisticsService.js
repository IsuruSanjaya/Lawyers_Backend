const Lawyer = require('../models/Lawyers');
const { getDateNDaysAgo } = require('../utils/dateUtils');

exports.calculateMetrics = async (lawyerId) => {
  const now = new Date();
  const last7Days = getDateNDaysAgo(7);
  const last30Days = getDateNDaysAgo(30);

  const lawyer = await Lawyer.findOne({ lawyerId });
  if (!lawyer) throw new Error('Lawyer not found');

  // Engagement Metrics (7 Days)
  const isRecent = lawyer.timestamp >= last7Days;
  const profileClicks = isRecent ? lawyer.profileClick : 0;
  const profileViews = isRecent ? lawyer.profileView : 0;
  const chatsStarted = isRecent ? lawyer.chatStarted : 0;
  const searchResults = lawyer.searchAppearance && isRecent ? 1 : 0;
  const messageSent = lawyer.messageSent && isRecent ? 1 : 0;

  // Response Time Metrics
  const leads = lawyer.leads || [];
  const messages = lawyer.messages || [];

  const leadToMessageTimes = [];
  const responseTimes7Days = [];

  for (const lead of leads) {
    const firstMsg = messages.find(m => m.leadId === lead.leadId && m.sentAt > lead.assignedAt);
    if (firstMsg) {
      const timeDiff = (firstMsg.sentAt - lead.assignedAt) / 1000;

      if (lead.assignedAt >= last30Days) {
        leadToMessageTimes.push(timeDiff);
      }

      if (firstMsg.sentAt >= last7Days) {
        responseTimes7Days.push(timeDiff);
      }
    }
  }

  // Bounce & Conversion
  const bounceRate = profileViews > 0 ? ((profileViews - chatsStarted) / profileViews) * 100 : 0;
  const conversionRate = profileViews > 0 ? (chatsStarted / profileViews) * 100 : 0;

  const avgLeadToMessage = leadToMessageTimes.length
    ? (leadToMessageTimes.reduce((a, b) => a + b) / leadToMessageTimes.length)
    : null;

  const avgResponseTime7Days = responseTimes7Days.length
    ? (responseTimes7Days.reduce((a, b) => a + b) / responseTimes7Days.length)
    : null;

  const lastBlogPublished = lawyer.blogPublished
    ? lawyer.timestamp.toDateString()
    : 'Not published yet';

  return {
    profileClicks,
    profileViews,
    chatsStarted,
    messageSent,
    searchResults,
    bounceRate: bounceRate.toFixed(2) + '%',
    conversionRate: conversionRate.toFixed(2) + '%',
    avgLeadToMessage, // in seconds
    avgResponseTime7Days, // in seconds
    lastBlogPublished,
  };
};
