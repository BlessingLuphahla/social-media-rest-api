const router = require("express").Router();
const Conversation = require("../models/Conversation");


router.post("/", async (req, res) => {
    const newConversation = new Conversation(req.body);
    try {
        const savedConversation = await newConversation.save();
        res.status(200).json(savedConversation);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router

