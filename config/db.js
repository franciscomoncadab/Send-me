const mongoose = require("mongoose");
require("dotenv").config({ path: "var.env" });

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB) /*, {
      useNewUrlParser: true,
      //useCreateIndex: true,
      //useFindAndModify: false,
      useUnifiedTopology: true,
    }); */
    console.log("MongoDB Connected...");
  } catch (err) {
    console.log("MongoDB Error");
    console.log(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
