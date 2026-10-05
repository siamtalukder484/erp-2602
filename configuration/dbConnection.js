const mongoose = require('mongoose');

function dbConnection(){
    mongoose.connect('mongodb+srv://desk-pc:Juf1Sc7G6Rkduwl7@cluster0.hmsuoom.mongodb.net/erp?appName=Cluster0')
  .then(() => console.log('Database connected')).catch((error) => {
    console.log("Database Connection Faild", error)
  });
}

module.exports = dbConnection