// وما توفيقي الا بالله عليه توكلت وهو رب العرش العظيم
import mongoose from "mongoose";

const uri = process.env.MONGO_URI || "mongodb://mongodb:27017/employees";

async function connectDB() {
  try {
    // await mongoose.connect(uri, {
    //   useNewUrlParser: true,cd
    //   useUnifiedTopology: true,
    // });
    await mongoose.connect(uri);
    console.log(" Connected to MongoDB");
  } catch (err) {
    console.error(" Error connecting to MongoDB:", err);
    process.exit(1);
  }
}

export default connectDB;
