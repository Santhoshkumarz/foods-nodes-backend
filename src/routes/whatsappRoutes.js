const express = require("express");
const {
  sendMessageToGroup,
  getWhatsappStatus,
} = require("../controller/whatsappController");

const router = express.Router();

// Route to send a message to a group
router.post("/send", sendMessageToGroup);

// Route to get WhatsApp status (QR code & readiness)
router.get("/status", getWhatsappStatus);

module.exports = router;
