const express = require("express");
const dotenv = require("dotenv").config();
const { errorHandle } = require("./middleware/errorMiddleware");
const port = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(express.urlencoded());

app.use("/api/goals", require("./routes/goalRoutes"));

app.use(errorHandle);

app.listen(port, () => console.log(`server running on port ${port}`));
