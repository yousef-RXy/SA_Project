// Important requires
const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();

//import Auth modal
const Auth = require("../models/auth");

// get & post methods
router.post("/signup", async (req, res) => {
	let resObj;
	const email = req.body.email;
	const password = await bcrypt.hash(req.body.password, 10);
	const regex = /^[\w-\.]+@[\w-]+.([a-z]){2,4}.([a-z]){2,4}?$/g;

	if (!regex.test(email)) {
		resObj = { status: 422, message: "User email is not valid" };
	} else {
		const isRepeted = await Auth.findOne({ email });
		if (isRepeted !== null) {
			resObj = { status: 422, message: "User email is signup before" };
		} else {
			const auth = new Auth({ email, password });
			const result = await auth.save();
			resObj = { status: 200, _id: result._id };
		}
	}

	res.send(resObj);
});

router.post("/login", async (req, res) => {
	let resObj;
	const user = { ...req.body };
	const auth = await Auth.findOne({ email: user.email });
	if (auth === null) {
		resObj = { status: 401, message: "User email not found" };
	} else if (!(await bcrypt.compare(user.password, auth.password))) {
		resObj = { status: 401, message: "User password is wrong" };
	} else {
		resObj = { status: 200, _id: auth._id };
	}
	res.send(resObj);
});

//export router
module.exports = router;
