const mongoose = require ('mongoose');

const connectToDB = async () => {
  try{
    
    await mongoose.connect("mongodb+srv://Meetdhruv:Meet0810@cluster0.cto1klh.mongodb.net/");
    console.log("Connected to MongoDB");
  }
  catch (error){
    console.log("Error connecting to MongoDB: " + error.message);
  }
}

module.exports= {connectToDB};