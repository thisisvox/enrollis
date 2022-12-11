const { Router } = require('express');

const router = Router();


//routes
//create handout -post: adding 
router.post ("/handout", async(req,res)=>{
    try {
        const {
            doc_title,
            doc_description,
            sess_id,
            pack_id
            } = req.body;
            const newHandout = await pool.query("INSERT INTO handout (doc_title, doc_description, sess_id, pack_id) values ($1,$2,$3,$4) returning *", [doc_title, doc_description, sess_id, pack_id]);
            res.json(newHandout.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
})
// get all handouts
router.get("/handout", async(req,res)=>{
    try {
      const allHandouts = await pool.query("SELECT * FROM handout");
      res.json(allHandouts.rows);
    } catch (err) {
        console.error(err.message);
    }
})

// get a handout
router.get("/handout/:id", async(req,res)=>{
    try {
        const {doc_id} = req.params;
        const handout = await pool.query("SELECT* FROM handout WHERE doc_id = $1", [doc_id]);
        res.json(handout.rows[0]);
    } catch (err) {
        console.error(err.message); 
    }
})
//update a handout
router.put("/handout/:id", async(req,res)=> {
    try {
      const {handout_id} = req.params;
      const {doc_title, doc_description, sess_id, pack_id} = req.body;
      const updateHandout = await pool.query("UPDATE handout SET (doc_title = $1, doc_link =$2, sess_id =$3, pack_id=$4) WHERE doc_id = $6", [doc_title, doc_description, sess_id, pack_id, sess_id]);
      res.json("Handout was updated successfully");
    } catch (err) {
        console.error(err.message);
    }
})
// delete a handout
router.delete("/session/:id", async(req,res)=>{
    try {
       const{doc_id} = req.params;
       const deleteHandout = await pool.query("DELETE FROM handout WHERE doc_id= $1", [doc_id]);
       res.json("Handout was deleted successfully");
    } catch (err) {
        console.error(err.message);
    }
})
    
module.exports = router;