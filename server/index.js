const express = require("express")
const cors = require("cors")
// require('dotenv').config();
const apirouter = require("./api/index")
const PORT = 5000;
const app = express();

//require('dotenv').config()


app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", apirouter)

app.listen(PORT, () =>
  console.log(`Listening on port ${PORT}!`),
);

