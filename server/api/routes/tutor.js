const { Router } = require('express');

const router = Router();

router.post("/tutor", async (req, res) => {
    try {
      const {user_type, 
        user_id,
        user_fname, 
        user_lname, 
        user_email, 
        user_phone,
        tutor_worked_hrs} = req.body;
      const newUser = await pool.query(
        "INSERT INTO tutor (user_type, user_id,user_fname, user_lname, user_email, user_phone, tutor_worked_hrs) VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING *",
        [user_type, user_id,user_fname, user_lname, user_email, user_phone, tutor_worked_hrs]
      );
  
      res.json(newUser.rows[0]);
    } catch (err) {
      console.error(err.message);
    }
  });

  router.get("/tutor", async (req, res) => {
    try {
      const allTutors = await pool.query("SELECT * FROM tutor");
      res.json(allTutors.rows);
    } catch (err) {
      console.error(err.message);
    }
  });

  router.get("/tutor/:id/:id2", async (req, res) => {
    try {
      const {user_type, user_id} = req.params;
      const tutor = await pool.query("SELECT * FROM tutor WHERE user_type = $1 AND user_id = $2", [
        user_type, user_id
      ]);
  
      res.json(tutor.rows[0]);
    } catch (err) {
      console.error(err.message);
    }
  });
  
  router.put("/tutor/:id", async (req, res) => {
    try {
      const { user_type, user_id } = req.params;
      const {user_fname, 
        user_lname, 
        user_email, 
        user_phone,
        tutor_worked_hrs} = req.body;
      const updateTodo = await pool.query(
        "UPDATE tutor SET user_type = $1, user_id = $2, user_fname = $3, user_lname = $4, user_email = $5, user_phone = $6, tutor_worked_hrs = $7 WHERE user_type = $8 AND user_id = $9",
        [user_fname, user_lname, user_email, user_phone, tutor_worked_hrs, user_type, user_id]
      );
  
      res.json("Tutor was updated!");
    } catch (err) {
      console.error(err.message);
    }
  });

  router.delete("/tutor/:id", async (req, res) => {
    try {
      const { user_type, user_id } = req.params;
      const deleteTutor = await pool.query("DELETE FROM tutor WHERE user_type = $1 AND user_id = $2", [
        user_type, user_id
      ]);
      res.json("Tutor was deleted!");
    } catch (err) {
      console.log(err.message);
    }
  });
  
  module.exports = router;






  