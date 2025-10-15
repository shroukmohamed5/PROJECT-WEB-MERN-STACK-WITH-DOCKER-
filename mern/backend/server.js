import express from "express";
import cors from "cors";
import records from "./routes/record.js";
import connectDB from "./db/connection.js";

const PORT = process.env.PORT || 5050;
const app = express();

// 1️⃣ Body parser
app.use(express.json());

// 2️⃣ CORS middleware شامل
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  
  // Preflight
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  
  next();
});

// 3️⃣ الراوتات
app.use("/record", records);

// 4️⃣ تشغيل السيرفر بعد الداتا بيز
connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
});
