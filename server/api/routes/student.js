const { Router } = require('express');
const pool = require("../../db");
const router = Router();

router.post("/", async (req, res) => {
    try {
      const {
        user_fname, 
        user_lname, 
        user_email, 
        user_phone,
        stu_level} = req.body;
      const newStudent = await pool.query(
        "INSERT INTO student (user_fname, user_lname, user_email, user_phone, stu_level) VALUES($1,$2,$3,$4,$5) RETURNING *",
        [user_fname, user_lname, user_email, user_phone, stu_level]
      );
  
      res.json(newStudent.rows[0]);
    } catch (err) {
      console.error(err.message);
    }
  });

  router.get("/", async (req, res) => {
    try {
      const allStudents = await pool.query("SELECT * FROM student");
      res.json(allStudents.rows);
    } catch (err) {
      console.error(err.message);
    }
  });

  router.get("/:user_type/:user_id", async (req, res) => {
    try {
      const {user_type, user_id} = req.params;
      const student = await pool.query("SELECT * FROM student WHERE user_type = $1 AND user_id = $2", [
        user_type, user_id
      ]);
  
      res.json(student.rows[0]);
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
        stu_level} = req.body;
      const updateStudent = await pool.query(
        "UPDATE student SET user_fname = $1, user_lname = $2, user_email = $3, user_phone = $4, stu_level = $5 WHERE user_type = $6 AND user_id = $7",
        [user_fname, user_lname, user_email, user_phone, stu_level, user_type, user_id]
      );
  
      res.json("Student was updated!");
    } catch (err) {
      console.error(err.message);
    }
  });

  router.delete("/:user_type/:user_id", async (req, res) => {
    try {
      const { user_type, user_id } = req.params;
      const deleteStudent = await pool.query("DELETE FROM student WHERE user_type = $1 AND user_id = $2", [
        user_type, user_id
      ]);
      res.json("Student was deleted!");
    } catch (err) {
      console.log(err.message);
    }
  });
  
  module.exports = router;