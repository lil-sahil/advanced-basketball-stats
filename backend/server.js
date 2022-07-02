const express = require("express");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db");

connectDB();

const port = process.env.PORT || 5000;

const app = express();

app.use("/api/yearly_data", require("./routes/yearRoutes"));

app.listen(port, () => console.log(`Server started on port ${port}`));
