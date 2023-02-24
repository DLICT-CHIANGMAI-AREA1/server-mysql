const mongoose = require("mongoose");

mongoose.connect(
	"mongodb+srv://admin:1234@cluster0.r8jzdpp.mongodb.net/MyFristDatabase?retryWrites=true&w=majority",
	{ useNewUrlParser: true },
	
);

module.exports = mongoose
