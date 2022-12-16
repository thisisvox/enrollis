const { Router } = require('express');
const pool = require("../../db");
const router = Router();

router.post("/", async (req, res) => {
    try {
      const {
        user_fname, 
        user_lname, 
        user_email, 
        user_phone} = req.body;
        console.log(req.body)
      const newTutor = await pool.query(
        "INSERT INTO tutor (user_fname, user_lname, user_email, user_phone, tutor_worked_hrs) VALUES($1,$2,$3,$4,0) RETURNING *",
        [user_fname, user_lname, user_email, user_phone]
      );
  
      res.json(newTutor.rows[0]);
    } catch (err) {
      console.error(err.message);
    }
  });

  router.get("/", async (req, res) => {
    try {
      const allTutors = await pool.query("SELECT * FROM tutor");
      res.json(allTutors.rows);
    } catch (err) {
      console.error(err.message);
    }
  });

  router.get("/:user_type/:user_id", async (req, res) => {
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
  
  router.put("/:user_type/:user_id", async (req, res) => {
    try {
      const { user_type, user_id } = req.params;
      const {user_fname, 
        user_lname, 
        user_email, 
        user_phone,
        tutor_worked_hrs} = req.body;
      const updateTutor = await pool.query(
        "UPDATE tutor SET user_fname = $1, user_lname = $2, user_email = $3, user_phone = $4, tutor_worked_hrs = $5 WHERE user_type = $6 AND user_id = $7",
        [user_fname, user_lname, user_email, user_phone, tutor_worked_hrs, user_type, user_id]
      );
  
      res.json("Tutor was updated!");
    } catch (err) {
      console.error(err.message);
    }
  });

  router.delete("/:user_type/:user_id", async (req, res) => {
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






  