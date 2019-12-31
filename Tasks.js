const mongoose = require("mongoose")
const Schema = mongoose.Schema

const TaskSchema = Schema({
	name: String
})

const Tasks = mongoose.model('Tasks', TaskSchema)
module.exports = Tasks