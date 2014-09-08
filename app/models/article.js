// ./app/models/article.js

// Article Model

var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

// Getters
var getTags = function(tags) {
	return tags.join(',');
}

// Setters
var setTags = function(tags) {
	return tags.split(',');
};


// Article Schema
var ArticleSchema = new Schema({
	title : {type: String, default: "", trim:true},
	body  : {type: String, default: "", trim:true},	
	user  : {type: Schema.ObjectId, ref: "User"},
	comments : [{
		body : {type: String, default:""},
		user : {type: Schema.ObjectId, ref: "User"},
		createAt : {type: Date, default: Date.now}
	}],
	tags : {type:[], get: getTags, set: setTags},
	image : {
		cdnUri : String,
		files: []
	},
	createAt : {type: Date, default: Date.now}
});



module.exports = mongoose.model('Articles', ArticleSchema);