const express = require("express")
const cors = require("cors")
const pool =require("./db");

const PORT = 5000;
const app = express();

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
//create session -post: adding 
app.post ("/session", async(req,res)=>{
    try {
        const {
            pack_id, 
            sess_title, 
            sess_description, 
            sess_date, 
            sess_link, 
            duration, 
            user_id} = req.body;
            const newSession = await pool.query("INSERT INTO session (pack_id,sess_title,sess_description,sess_date, sess_link, duration, user_id) values ($1,$2,$3,$4,$5,$6,$7) returning *", [pack_id,sess_title,sess_description,sess_date, sess_link, duration, user_id]);
            res.json(newSession.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
})
// get all sessions
app.get("/session", async(req,res)=>{
    try {
      const allSessions = await pool.query("SELECT * FROM session");
      res.json(allSessions.rows);
    } catch (err) {
        console.error(err.message);
    }
})

// get a session
app.get("/session/:id", async(req,res)=>{
    try {
        const {sess_id} = req.params;
        const session = await pool.query("SELECT* FROM session WHERE sess_id = $1", [sess_id]);
        res.json(session.rows[0]);
    } catch (err) {
        console.error(err.message); 
    }
})
//update a session
app.put("/session/:id", async(req,res)=> {
    try {
      const {sess_id} = req.params;
      const {sess_description, sess_date, sess_link, duration, user_id} = req.body;
      const updateSession = await pool.query("UPDATE session SET (sess_description = $1, sess_date =$2, sess_link =$3, duration=$4, user_id=$5) WHERE sess_id = $6", [sess_description, sess_date, sess_link, duration, user_id , sess_id]);
      res.json("Session was updated successfully");
    } catch (err) {
        console.error(err.message);
    }
})
// delete a session
app.delete("/session/:id", async(req,res)=>{
    try {
       const{sess_id} = req.params;
       const deleteTodo = await pool.query("DELETE FROM session WHERE sess_id= $1", [sess_id]);
       res.json("Session was deleted successfully");
    } catch (err) {
        console.error(err.message);
    }
})
    
           
app.listen(PORT, ()=>{
    console.log(`Server has started on port ${PORT}`);
})