const { Router } = require('express');
const pool = require("../../db");
const router = Router();



  router.get("/tutor", async (req, res) => {
    try {
      const numberofTutors = await pool.query("SELECT * FROM tutor");
      res.json(numberofTutors.rowCount);
    } catch (err) {
      console.error(err.message);
    }
  });

  router.get("/student", async (req, res) => {
    try {
      const numberofStudents = await pool.query("SELECT * FROM student");
      res.json(numberofStudents.rowCount);
    } catch (err) {
      console.error(err.message);
    }
  });

  router.get("/package", async (req, res) => {
    try {
      const numberofPackages = await pool.query("SELECT * FROM package");
      res.json(numberofPackages.rowCount);
    } catch (err) {
      console.error(err.message);
    }
  });

  router.get("/session", async (req, res) => {
    try {
      const numberofPackages = await pool.query("SELECT * FROM session");
      res.json(numberofPackages.rowCount);
    } catch (err) {
      console.error(err.message);
    }
  });

  
  module.exports = router;






  