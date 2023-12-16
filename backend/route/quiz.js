// Important requires
const express = require("express");
const router = express.Router();

//import Quiz modal
const Quiz = require("../models/quiz");

// get & post methods
router.post("/", async (req, res) => {
	const quiz = new Quiz({ ...req.body });
	const result = await quiz.save();
	res.send({ status: 200, quizID: result._id });
});

router.get("/", async (req, res) => {
	const result = await Quiz.find();
	res.send({ status: 200, quizzes: result });
});

router.get("/:id", async (req, res) => {
	const id = req.params.id;
	const result = await Quiz.findById(id);
	res.send({ status: 200, quiz: result });
});

//export router
module.exports = router;
