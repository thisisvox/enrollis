const { Router } = require('express');
const pool = require("../../db");
const router = Router();


//routes
//create session -post: adding 
router.post ("/", async(req,res)=>{
    try {
        const {
            pack_id, 
            sess_title, 
            sess_description, 
            sess_date, 
            sess_link, 
            duration} = req.body;
            const newSession = await pool.query("INSERT INTO session (pack_id,sess_title,sess_description,sess_date, sess_link, duration) values ($1,$2,$3,$4,$5,$6) returning *", [pack_id,sess_title,sess_description,sess_date, sess_link, duration]);
            res.json(newSession.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
})
// get all sessions
router.get("/", async(req,res)=>{
    try {
      const allSessions = await pool.query("SELECT * FROM session");
      res.json(allSessions.rows);
    } catch (err) {
        console.error(err.message);
    }
})

// get a session
router.get("/:pack_id", async(req,res)=>{
    try {
        const {pack_id} = req.params;
        const session = await pool.query("SELECT* FROM session WHERE pack_id = $1", [pack_id]);
        res.json(session.rows);
    } catch (err) {
        console.error(err.message); 
    }
})
//update a session
router.put("/:sess_id", async(req,res)=> {
    try {
      const {sess_id}= req.params;
      const {sess_description, sess_date, sess_link, duration} = req.body;
      const updateSession = await pool.query("UPDATE session SET (sess_description = $1, sess_date =$2, sess_link =$3, duration=$4) WHERE sess_id = $5", [sess_description, sess_date, sess_link, duration, sess_id]);
      res.json("Session was updated successfully");
    } catch (err) {
        console.error(err.message);
    }
})
// delete a session
router.delete("/:sess_id", async(req,res)=>{
    try {
       const {sess_id} = req.params;
       const deleteSession = await pool.query("DELETE FROM session WHERE sess_id= $1", [sess_id]);
       res.json("Session was deleted successfully");
    } catch (err) {
        console.error(err.message);
    }
})

module.exports = router;