/* eslint-disable no-undef */
const multer = require("multer");
const path = require("path");

const upload = multer({
	storage: multer.memoryStorage(),
	limits: { fileSize: 10485760 },
	fileFilter: async function (req, file, cb) {
		checkFileType(file, cb);
	},
}).single("file");

// Check file Type
function checkFileType(file, cb) {
	// Allowed ext
	const fileTypes = /jpeg|jpg|png|gif|pdf/;
	// Check ext
	const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
	// Check mime
	const mimeType = fileTypes.test(file.mimetype);

	if (mimeType && extName) {
		return cb(null, true);
	} else {
		cb("Error: unsuported file !!!");
	}
}

module.exports = { upload };
