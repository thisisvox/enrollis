const { Router } = require('express');

const router = Router();


//routes

router.post ("/enroll", async(req,res)=>{
    try {
        const {
            user_type, 
            user_id, 
            pack_id, 
            enroll_date} = req.body;
            const newEnroll = await pool.query("INSERT INTO enroll (user_type, user_id,pack_id,enroll_date) values ($1,$2,$3,$4 returning *", [user_type, user_id,pack_id,enroll_date]);
            res.json(newEnroll.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
})

router.get("/enroll", async(req,res)=>{
    try {
      const allEnrolls = await pool.query("SELECT * FROM enroll");
      res.json(allEnrolls.rows);
    } catch (err) {
        console.error(err.message);
    }
})


router.get("/enroll/:id", async(req,res)=>{
    try {
        const {user_type, user_id, pack_id} = req.params;
        const enroll = await pool.query("SELECT* FROM enroll WHERE user_type = $1 AND user_id = $2 AND pack_id = $3", [user_type, user_id, pack_id]);
        res.json(enroll.rows[0]);
    } catch (err) {
        console.error(err.message); 
    }
})

router.put("/enroll/:id/:id2/:id3", async(req,res)=> {
    try {
      const {user_type, user_id, pack_id} = req.params;
      const {enroll_date} = req.body;
      const updateSession = await pool.query("UPDATE enroll SET enroll_date = $1 WHERE user_type = $1 AND user_id = $2 AND pack_id = $3", [user_type, user_id, pack_id]);
      res.json("Session was updated successfully");
    } catch (err) {
        console.error(err.message);
    }
})

router.delete("/enroll/:id/:id2/:id3", async(req,res)=>{
    try {
       const{user_type, user_id, pack_id} = req.params;
       const deleteEnroll = await pool.query("DELETE FROM enroll WHERE user_type = $1 AND user_id = $2 AND pack_id = $3", [user_type, user_id, pack_id]);
       res.json("Enroll was deleted successfully");
    } catch (err) {
        console.error(err.message);
    }
})
    
module.exports = router;