// utils/statsUtils.js
const updateDailyStats = (lawyer, field) => {
  const today = new Date();
  const todayStr = today.toISOString().split('T')[0];

  const stat = lawyer.dailyStats.find(
    entry => entry.date.toISOString().split('T')[0] === todayStr
  );

  if (stat) {
    stat[field] = (stat[field] || 0) + 1;
  } else {
    const newEntry = {
      date: today,
      profileClick: 0,
      profileView: 0,
      chatStarted: 0,
      messageSent: false,
    };
    newEntry[field] = 1;
    lawyer.dailyStats.push(newEntry);
  }
};

module.exports = {
  updateDailyStats
};
