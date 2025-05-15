const express = require("express");
const router = express.Router();
const lawyerController = require("../controllers/lawyerController");
const { addLead, addMessage } = require("../controllers/leadMessageController");

router.post("/lawyers", lawyerController.createLawyer);
router.put("/lawyers/click/:lawyerId", lawyerController.profileClick);
router.put("/lawyers/view/:lawyerId", lawyerController.profileView);
router.put("/lawyers/chat/:lawyerId", lawyerController.chatStarted);
// Add a lead
router.post("/:lawyerId/lead", addLead);

// Add a message
router.post("/:lawyerId/message", addMessage);

module.exports = router;
