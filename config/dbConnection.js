const mongoose = require("mongoose");

const dbConnect = async () => {
  try {
    const connect = await mongoose.connect(process.env.CONNECTION_URI);
    
    console.log(` data base is connected`);
  } catch (error) {
    console.log(error);
  }
};

module.exports = dbConnect;
