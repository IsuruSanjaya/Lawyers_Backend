const express = require('express');
const mongoose = require('mongoose');
const statisticsRoutes = require('./src/routes/statisticsRoutes');
const lawyerRoutes= require('./src/routes/lawyerRoutes')

const app = express();
app.use(express.json());

mongoose.connect('mongodb+srv://isuru:1234@db01.lterdlp.mongodb.net/Lawyers', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use('/api/statistics', statisticsRoutes);
app.use('/api', lawyerRoutes);


app.listen(3000, () => console.log('Server running on port 3000'));