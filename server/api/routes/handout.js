const { Router } = require('express');
const pool = require("../../db");
const router = Router();


//routes
//create handout -post: adding 
router.post ("/", async(req,res)=>{
    try {
        const {
            doc_title,
            doc_link,
            sess_id,
            } = req.body;
            const newHandout = await pool.query("INSERT INTO handout (doc_title, doc_link, sess_id) values ($1,$2,$3) returning *", [doc_title, doc_link, sess_id]);
            res.json(newHandout.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
})
// get all handouts
router.get("/", async(req,res)=>{
    try {
      const allHandouts = await pool.query("SELECT * FROM handout");
      res.json(allHandouts.rows);
    } catch (err) {
        console.error(err.message);
    }
})

// get a handout
router.get("/:doc_id", async(req,res)=>{
    try {
        const {doc_id} = req.params;
        const handout = await pool.query("SELECT* FROM handout WHERE doc_id = $1", [doc_id]);
        res.json(handout.rows[0]);
    } catch (err) {
        console.error(err.message); 
    }
})
//update a handout
router.put("/:doc_id", async(req,res)=> {
    try {
      const {doc_id} = req.params;
      const {doc_title, doc_link, sess_id} = req.body;
      const updateHandout = await pool.query("UPDATE handout SET (doc_title = $1, doc_link =$2, sess_id =$3) WHERE doc_id = $6", [doc_title, doc_link, sess_id, sess_id]);
      res.json("Handout was updated successfully");
    } catch (err) {
        console.error(err.message);
    }
})
// delete a handout
router.delete("/:doc_id", async(req,res)=>{
    try {
       const {doc_id} = req.params;
       const deleteHandout = await pool.query("DELETE FROM handout WHERE doc_id= $1", [doc_id]);
       res.json("Handout was deleted successfully");
    } catch (err) {
        console.error(err.message);
    }
})
    
module.exports = router;