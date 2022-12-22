const { Router } = require('express');
const pool = require("../../db");
const router = Router();

router.post("/", async (req, res) => {
    try {
      const {pack_type, 
        test_title, 
        pack_price, 
        pack_n_session, 
        pack_sdate, 
        pack_edate, 
        pack_days, 
        pack_stime, 
        pack_etime,
        user_id } = req.body;
      const newPackage = await pool.query(
        "INSERT INTO package (pack_type, test_title, pack_price, pack_n_session, pack_sdate,pack_edate, pack_days, pack_stime, pack_etime, user_id ) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *",
        [pack_type, test_title, pack_price, pack_n_session, pack_sdate,pack_edate, pack_days, pack_stime, pack_etime, user_id]
      );
  
      res.json(newPackage.rows[0]);
    } catch (err) {
      console.error(err.message);
    }
  });

  router.get("/", async (req, res) => {
    try {
      const allPackages = await pool.query("SELECT * FROM package");
      res.json(allPackages.rows);
    } catch (err) {
      console.error(err.message);
    }
  });

  router.get("/:pack_id", async (req, res) => {
    try {
      const {pack_id}  = req.params;
      const package = await pool.query("SELECT * FROM package WHERE pack_id = $1", [
        pack_id
      ]);
  
      res.json(package.rows[0]);
    } catch (err) {
      console.error(err.message);
    }
  });
  
  router.put("/:pack_id", async (req, res) => {
    try {
      const {pack_id}  = req.params;
      const {
        pack_type, 
        test_title, 
        pack_price, 
        pack_n_session, 
        pack_sdate, 
        pack_edate, 
        pack_days, 
        pack_stime, 
        pack_etime,
        user_id} = req.body;
      const updatePackage = await pool.query(
        "UPDATE package SET pack_type = $1, test_title = $2, pack_price = $3, pack_n_session = $4, pack_sdate = $5, pack_edate = $6, pack_days = $7, pack_stime = $8, pack_etime = $9, user_id = $10 WHERE pack_id = $11",
        [pack_type, test_title, pack_price, pack_n_session, pack_sdate,pack_edate, pack_days, pack_stime, pack_etime , user_id, pack_id]
      );
  
      res.json("Package was updated!");
    } catch (err) {
      console.error(err.message);
    }
  });

  router.delete("/:pack_id", async (req, res) => {
    try {
      const {pack_id}  = req.params;
      const deletePackage = await pool.query("DELETE FROM package WHERE pack_id = $1", [
        pack_id
      ]);
      res.json("Package was deleted!");
    } catch (err) {
      console.log(err.message);
    }
  });
  
  module.exports = router;






  