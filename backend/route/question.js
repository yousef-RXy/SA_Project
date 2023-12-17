/* eslint-disable no-undef */
// Important requires
const express = require("express");
const router = express.Router();

//import Question modal
const Question = require("../models/question");

// get & post methods
router.post("/", async (req, res) => {
	const question = { ...req.body };
	const isExist = await Question.exists({
		question: question.question,
		subject: question.subject,
	});
	let result;
	if (isExist)
		result = await Question.findByIdAndUpdate(isExist._id, question, {
			new: true,
		});
	else {
		try {
			const questionQuery = new Question(question);
			result = await questionQuery.save();
		} catch (error) {
			res.send({ status: 401, err: error.message });
		}
	}
	res.send({ status: 200, question: result._id });
});

router.get("/", async (req, res) => {
	const result = await Question.find();
	res.send({ status: 200, questions: result });
});

//export router
module.exports = router;
