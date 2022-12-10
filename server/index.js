const express = require("express")
const cors = require("cors")
const pool =require("./db");

const PORT = 5000;
const app = express();

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

           
app.listen(PORT, ()=>{
    console.log(`Server has started on port ${PORT}`);
})