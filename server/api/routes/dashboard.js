const { Router } = require('express');
const pool = require("../../db");
const router = Router();



  router.get("/tutor", async (req, res) => {
    try {
      const numberofTutors = await pool.query("SELECT count(*) FROM tutor");
      res.json(numberofTutors);
    } catch (err) {
      console.error(err.message);
    }
  });

  router.get("/student", async (req, res) => {
    try {
      const numberofStudents = await pool.query("SELECT count(*) FROM student");
      res.json(numberofTutors);
    } catch (err) {
      console.error(err.message);
    }
  });

  router.get("/", async (req, res) => {
    try {
      const numberofPackages = await pool.query("SELECT count(*) FROM package");
      res.json(numberofPackages);
    } catch (err) {
      console.error(err.message);
    }
  });


  
  module.exports = router;






  