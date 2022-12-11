const { Router } = require('express');

const router = Router();

router.post("/admin", async (req, res) => {
    try {
      const {user_type, 
        user_id,
        user_fname, 
        user_lname, 
        user_email, 
        user_phone,
        access_degree} = req.body;
      const newAdmin = await pool.query(
        "INSERT INTO admin (user_type, user_id,user_fname, user_lname, user_email, user_phone, access_degree) VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING *",
        [user_type, user_id,user_fname, user_lname, user_email, user_phone, access_degree]
      );
  
      res.json(newAdmin.rows[0]);
    } catch (err) {
      console.error(err.message);
    }
  });

  router.get("/admin", async (req, res) => {
    try {
      const allAdmins = await pool.query("SELECT * FROM admin");
      res.json(allAdmins.rows);
    } catch (err) {
      console.error(err.message);
    }
  });

  router.get("/admin/:id/:id2", async (req, res) => {
    try {
      const {user_type, user_id} = req.params;
      const Admin = await pool.query("SELECT * FROM admin WHERE user_type = $1 AND user_id = $2", [
        user_type, user_id
      ]);
  
      res.json(Admin.rows[0]);
    } catch (err) {
      console.error(err.message);
    }
  });
  
  router.put("/Admin/:id", async (req, res) => {
    try {
      const { user_type, user_id } = req.params;
      const {user_fname, 
        user_lname, 
        user_email, 
        user_phone,
        access_degree} = req.body;
      const updateAdmin = await pool.query(
        "UPDATE admin SET user_type = $1, user_id = $2, user_fname = $3, user_lname = $4, user_email = $5, user_phone = $6, access_degree = $7 WHERE user_type = $8 AND user_id = $9",
        [user_fname, user_lname, user_email, user_phone, access_degree, user_type, user_id]
      );
  
      res.json("Admin was updated!");
    } catch (err) {
      console.error(err.message);
    }
  });

  router.delete("/Admin/:id", async (req, res) => {
    try {
      const { user_type, user_id } = req.params;
      const deleteAdmin = await pool.query("DELETE FROM admin WHERE user_type = $1 AND user_id = $2", [
        user_type, user_id
      ]);
      res.json("Admin was deleted!");
    } catch (err) {
      console.log(err.message);
    }
  });
  
  module.exports = router;






  