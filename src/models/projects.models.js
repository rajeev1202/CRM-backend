const mongoose = require("mongoose");

const projectSchema = mongoose.Schema(
  {
	id: {
		type: mongoose.Schema.Types.ObjectId,
		required: [true],
	},
	name: {
		type: String,
		required: true,
	},
	customerId: {
    	type: mongoose.Schema.Types.ObjectId,
	  	required: true,
	},
	quotationId: {
    	type: mongoose.Schema.Types.ObjectId,
	  	required: true,
	},
  },
  {
	timestamps: true,
  }
);

const Projects = mongoose.model("Projects", projectSchema);
module.exports = Projects;
