const { Router } = require('express');
const pool = require("../../db");
const router = Router();

router.put("/:doc_id", async(req,res)=> {
    try {
        const {doc_id} = req.params;
        const {doc_title, doc_description, sess_id, pack_id} = req.body;
        const updateHandout = await pool.query("UPDATE handout SET (doc_title = $1, doc_link =$2, sess_id =$3, pack_id=$4) WHERE doc_id = $6", [doc_title, doc_description, sess_id, pack_id, sess_id]);
        res.json("Handout was updated successfully");
    } catch (err) {
        console.error(err.message);
    }
})