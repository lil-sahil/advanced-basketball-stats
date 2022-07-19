const express = require("express");
const dotenv = require("dotenv").config();
const { connectDB } = require("./config/db");
const { connectDBGeneral } = require("./config/db");
const cors = require("cors");

connectDB();
connectDBGeneral();

const port = process.env.PORT || 5000;

const app = express();
app.use(cors());

app.use("/api/yearly_data", require("./routes/yearRoutes"));
app.use("/api/", require("./routes/playerRoutes"));
app.listen(port, () => console.log(`Server started on port ${port}`));
