const express = require("express");
const router = express.Router();
const notesController = require("../Controllers/notes");
const authCheck = require("../authCheck/authCheck");


router.get("/make-notes", authCheck.checkAuth, notesController.getNotes);
router.post("/post-note", authCheck.checkAuth, notesController.postNote);
router.get("/delete-note", authCheck.checkAuth, notesController.deleteNote);
router.get("/view-note", authCheck.checkAuth, notesController.fullNote);


module.exports = router;