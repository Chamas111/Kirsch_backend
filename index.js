require("dotenv/config");
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const auftragRouter = require("./routes/auftraege");
const events = require("./routes/events");
const hvzs = require("./routes/hvzs");
const authRouter = require("./routes/users");
const cookieParser = require("cookie-parser");
const PORT = process.env.PORT || 8000;

const app = express();
app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use("/api/auftraege", auftragRouter);
app.use("/api/events", events);
app.use("/api/hvzs", hvzs);
app.use("/auth", authRouter);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
  });
});
