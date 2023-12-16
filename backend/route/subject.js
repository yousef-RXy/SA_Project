// Important requires
const express = require("express");
const router = express.Router();

//import Subject modal
const Subject = require("../models/subject");

// get & post methods
router.post("/", async (req, res) => {
	const subject = new Subject({ ...req.body });
	const result = await subject.save();
	res.send({ status: 200, subjectID: result._id });
});

router.get("/", async (req, res) => {
	const result = await Subject.find();
	res.send({ status: 200, subjects: result });
});

//export router
module.exports = router;
