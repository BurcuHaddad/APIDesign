const accountSid = process.env.MESSAGE_SID;
const authToken = process.env.MESSAGE_AUTH;
const client = require("twilio")(accountSid, authToken);

module.exports = client;