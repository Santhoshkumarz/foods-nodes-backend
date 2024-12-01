const qrcode = require("qrcode-terminal");
const { Client } = require("whatsapp-web.js");

// Initialize WhatsApp client
const client = new Client();
let isClientReady = false; // Flag to track client readiness
let qrCode = ""; // To store the QR code

// Event: When QR code is generated
client.on("qr", (qr) => {
  qrCode = qr; // Store the QR code in the variable
  console.log("Please scan this QR code with your WhatsApp mobile app.");
  qrcode.generate(qr, { small: true });
});

// Event: When client is ready
client.on("ready", () => {
  isClientReady = true;
  console.log("Client is ready and connected to WhatsApp!");
});

// Helper function to wait for client to be ready
const waitForClientReady = () => {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      reject("Timeout waiting for client to be ready");
    }, 60000); // Wait for 60 seconds for the client to be ready

    const checkReady = () => {
      if (isClientReady) {
        clearTimeout(timeout);
        resolve();
      } else {
        setTimeout(checkReady, 1000); // Retry every second
      }
    };
    checkReady();
  });
};

// Send message to a WhatsApp group
const sendMessageToGroup = async (req, res) => {
    const { groupName, message } = req.body;
  
    if (!groupName || !message) {
      return res.status(400).json({ error: "Group name and message are required" });
    }
  
    try {
      await waitForClientReady(); // Wait until client is ready
  
      const chats = await client.getChats();
      const group = chats.find((chat) => chat.name === groupName);
  
      if (!group) {
        return res.status(404).json({ error: "Group not found" });
      }
  
      await client.sendMessage(group.id._serialized, message);
      return res.status(200).json({ message: `Message sent to the group: ${groupName}` });
  
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Error fetching chats or sending message", details: error.message });
    }
  };
  

// Get WhatsApp status (QR code & readiness)
const getWhatsappStatus = (req, res) => {
  res.status(200).json({
    qrCode,
    isClientReady,
  });
};

// Initialize the client
client.initialize();

module.exports = { sendMessageToGroup, getWhatsappStatus };
