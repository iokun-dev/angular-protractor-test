var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var monitorSchema   = new Schema({
    _id: Schema.Types.ObjectId,
    menu: String,
    subMenu : String,
    url: String,
    userId: String,
	isTestPassed: Boolean,
	log: String,
	testDate: Date	
},{collection : 'monitor'});

module.exports = monitorSchema;