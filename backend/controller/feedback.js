const FeedbackModel = require("../model/feedback");

const feedbackController = (req, res) => {
    try {
        const [sender, feedback] = req.body;
        const newfeedback = new FeedbackModel({
            sender : sender,
            feedback : feedback
        })
        newfeedback.save()
        return res.status(200).json({message : "feedback received"})
    } 
    catch(err) {
        return res.status(401).json({error : err})
    }
    
}

module.exports = feedbackController