const express = require("express");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db");
const colors = require("colors");
const { errorHandle } = require("./middleware/errorMiddleware");
const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded());

app.use("/api/goals", require("./routes/goalRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

app.use(errorHandle);

app.listen(port, () => console.log(`server running on port ${port}`));
