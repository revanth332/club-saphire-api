require('./node_modules/dotenv/config')
const mongoose = require('mongoose');
const connectDB = async () => {
    try {
      // const conn = await mongoose.connect("mongodb://localhost:27017/feedback");
      const conn = await mongoose.connect("mongodb+srv://Revanth:dMeofbH5xA0Gu7QO@cluster0.uapxf.mongodb.net/feedback");
      console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  }
  const responseSchema = mongoose.Schema({
    Name : String,
    Regdno : String,
    Gender : String,
    Enjoyable:String,
    Promoted:String,
    Accommodation:String,
    WelcomeFormality:String,
    MailCommunication:String,
    Transportation:String,
    Venue:String,
    Activities:String,
    Speakers:String,
    Rating:String,
    Future:String
    
});
  
  const responseModel = mongoose.model("response",responseSchema);

  module.exports = {responseModel,connectDB};