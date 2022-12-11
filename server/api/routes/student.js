const { Router } = require('express');

const router = Router();

router.post("/student", async (req, res) => {
    try {
      const {user_type, 
        user_id,
        user_fname, 
        user_lname, 
        user_email, 
        user_phone,
        stu_level} = req.body;
      const newStudent = await pool.query(
        "INSERT INTO student (user_type, user_id,user_fname, user_lname, user_email, user_phone, stu_level) VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING *",
        [user_type, user_id,user_fname, user_lname, user_email, user_phone, stu_level]
      );
  
      res.json(newStudent.rows[0]);
    } catch (err) {
      console.error(err.message);
    }
  });

  router.get("/student", async (req, res) => {
    try {
      const allStudents = await pool.query("SELECT * FROM student");
      res.json(allStudents.rows);
    } catch (err) {
      console.error(err.message);
    }
  });

  router.get("/student/:id/:id2", async (req, res) => {
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
  
  router.put("/student/:id", async (req, res) => {
    try {
      const { user_type, user_id } = req.params;
      const {user_fname, 
        user_lname, 
        user_email, 
        user_phone,
        stu_level} = req.body;
      const updateStudent = await pool.query(
        "UPDATE student SET user_type = $1, user_id = $2, user_fname = $3, user_lname = $4, user_email = $5, user_phone = $6, stu_level = $7 WHERE user_type = $8 AND user_id = $9",
        [user_fname, user_lname, user_email, user_phone, stu_level, user_type, user_id]
      );
  
      res.json("Student was updated!");
    } catch (err) {
      console.error(err.message);
    }
  });

  router.delete("/student/:id", async (req, res) => {
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






  