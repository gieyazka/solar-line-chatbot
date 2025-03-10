const express = require("express");
const axios = require("axios");
require("dotenv").config();
const app = express();
const PORT = 3000;
const { Message_Token } = process.env;
const LINE_ACCESS_TOKEN = Message_Token;
app.use(express.json());

app.post("/webhook", async (req, res) => {
  const events = req.body.events;
  if (!events || events.length === 0) {
    return res.sendStatus(200);
  }

  for (let event of events) {
    if (event.type === "message" && event.message.type === "text") {
      const replyToken = event.replyToken;
      const userMessage = event.message.text;

      let replyText = "ฉันไม่เข้าใจ กรุณาลองใหม่"; // ค่าเริ่มต้น
      if (userMessage.includes("แบบฟอร์มตอบรับเข้าร่วมโครงการ")) {
        replyText = "นี่คือเมนูของเราครับ";
        await replyFlexFiles(replyToken);
      } 
    //   else if (userMessage === "สวัสดี") {
    //     replyText = "สวัสดีครับ! 😊";
    //     await replyMessage(replyToken, replyText);
    //   } else {
    //     await replyMessage(replyToken, replyText);
    //   }
    }
  }

  res.sendStatus(200);
});

async function replyMessage(replyToken, text) {
  const url = "https://api.line.me/v2/bot/message/reply";
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${LINE_ACCESS_TOKEN}`,
  };

  const body = {
    replyToken: replyToken,
    messages: [{ type: "text", text: text }],
  };

  await axios.post(url, body, { headers });
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

async function replyFlexMessage(replyToken) {
  const url = "https://api.line.me/v2/bot/message/reply";
  console.log('replyToken', replyToken)
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${LINE_ACCESS_TOKEN}`,
  };

  const body = {
    replyToken: replyToken,
    messages: [
      {
        type: "flex",
        altText: "เมนูของเรา",
        contents: {
          type: "bubble",
          body: {
            type: "box",
            layout: "vertical",
            contents: [
              { type: "text", text: "เมนูของเรา", weight: "bold", size: "lg" },
              {
                type: "text",
                text: "กรุณาเลือกตัวเลือกด้านล่าง",
                wrap: true,
                size: "sm",
              },
            ],
          },
          footer: {
            type: "box",
            layout: "vertical",
            spacing: "sm",
            contents: [
              {
                type: "button",
                style: "primary",
                color: "#00B050",
                action: {
                  type: "uri",
                  label: "ดูเมนูอาหาร",
                  uri: "https://your-website.com/menu",
                },
              },
              {
                type: "button",
                style: "primary",
                color: "#007BFF",
                action: {
                  type: "uri",
                  label: "สั่งอาหาร",
                  uri: "https://your-website.com/order",
                },
              },
            ],
          },
        },
      },
    ],
  };

  await axios.post(url, body, { headers });
}


async function replyFlexFiles(replyToken) {
    const url = "https://api.line.me/v2/bot/message/reply";
    const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${LINE_ACCESS_TOKEN}`
    };

    const body = {
        replyToken: replyToken,
        messages: [
            {
                "type": "flex",
                "altText": "เลือกไฟล์ที่ต้องการดาวน์โหลด",
                "contents": {
                    "type": "carousel",
                    "contents": [
                        {
                            "type": "bubble",
                            "body": {
                                "type": "box",
                                "layout": "vertical",
                                "contents": [
                                    { "type": "text", "text": "ไฟล์ 1: คู่มือการใช้งาน", "weight": "bold", "size": "lg" },
                                    { "type": "text", "text": "PDF - 10MB", "wrap": true, "size": "sm" }
                                ]
                            },
                            "footer": {
                                "type": "box",
                                "layout": "vertical",
                                "contents": [
                                    {
                                        "type": "button",
                                        "style": "primary",
                                        "color": "#00B050",
                                        "action": {
                                            "type": "uri",
                                            "label": "ดาวน์โหลด PDF",
                                            "uri": "https://your-server.com/files/manual.pdf"
                                        }
                                    }
                                ]
                            }
                        },
                        {
                            "type": "bubble",
                            "body": {
                                "type": "box",
                                "layout": "vertical",
                                "contents": [
                                    { "type": "text", "text": "ไฟล์ 2: รายงานการขาย", "weight": "bold", "size": "lg" },
                                    { "type": "text", "text": "Excel - 5MB", "wrap": true, "size": "sm" }
                                ]
                            },
                            "footer": {
                                "type": "box",
                                "layout": "vertical",
                                "contents": [
                                    {
                                        "type": "button",
                                        "style": "primary",
                                        "color": "#007BFF",
                                        "action": {
                                            "type": "uri",
                                            "label": "ดาวน์โหลด Excel",
                                            "uri": "https://your-server.com/files/sales.xlsx"
                                        }
                                    }
                                ]
                            }
                        },
                        {
                            "type": "bubble",
                            "body": {
                                "type": "box",
                                "layout": "vertical",
                                "contents": [
                                    { "type": "text", "text": "ไฟล์ 3: สัญญาจ้าง", "weight": "bold", "size": "lg" },
                                    { "type": "text", "text": "Word - 2MB", "wrap": true, "size": "sm" }
                                ]
                            },
                            "footer": {
                                "type": "box",
                                "layout": "vertical",
                                "contents": [
                                    {
                                        "type": "button",
                                        "style": "primary",
                                        "color": "#FF5733",
                                        "action": {
                                            "type": "uri",
                                            "label": "ดาวน์โหลด Word",
                                            "uri": "https://your-server.com/files/contract.docx"
                                        }
                                    }
                                ]
                            }
                        }
                    ]
                }
            }
        ]
    };

    await axios.post(url, body, { headers });
}