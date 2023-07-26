const mongoose = require('mongoose')

const Feedback = new mongoose.Schema({
    sender : String,
    feedback : String
})

const FeedbackModel = mongoose.model("Feedback", Feedback)
module.exports = FeedbackModel