require("dotenv").config();
const express = require("express");
const { Client, middleware } = require("@line/bot-sdk");
const { getCarSpec } = require("./carData");

const config = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.CHANNEL_SECRET,
};

const client = new Client(config);
const app = express();

app.post("/webhook", middleware(config), (req, res) => {
  Promise.all(req.body.events.map(handleEvent))
    .then((result) => res.json(result))
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });
});

function handleEvent(event) {
  if (event.type !== "message" || event.message.type !== "text") {
    return Promise.resolve(null);
  }

  const msg = event.message.text.toLowerCase();
  let replyText = "ขออภัย ฉันไม่เข้าใจคำถาม";

  if (msg.includes("ranger")) {
    replyText = getCarSpec("ranger");
  } else if (msg.includes("everest")) {
    replyText = getCarSpec("everest");
  } else if (msg.includes("สเปค") || msg.includes("spec")) {
    replyText = "พิมพ์ชื่อรุ่นที่ต้องการ เช่น Ranger หรือ Everest เพื่อดูสเปค";
  }

  return client.replyMessage(event.replyToken, {
    type: "text",
    text: replyText,
  });
}

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`🚀 Server is running on port ${port}`);
});
