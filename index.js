const express = require("express");
const axios = require("axios");
require("dotenv").config();
const app = express();
const PORT = 3000;
const { Message_Token } = process.env;
const LINE_ACCESS_TOKEN = Message_Token;
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello World");
});
app.post("/webhook", async (req, res) => {
    console.log('13', 13)
  const events = req.body.events;
  if (!events || events.length === 0) {
    return res.sendStatus(200);
  }

  for (let event of events) {
    if (event.type === "message" && event.message.type === "text") {
      const replyToken = event.replyToken;
      const userMessage = event.message.text;

      let replyText = "ฉันไม่เข้าใจ กรุณาลองใหม่"; // ค่าเริ่มต้น
      if (
        userMessage.includes("แบบฟอร์มตอบรับเข้าร่วมโครงการ") ||
        userMessage === "1"
      ) {
        replyText = "นี่คือเมนูของเราครับ";
        await replyFlexFiles(replyToken);
      } else if (userMessage.includes("เมนูอาหาร") || userMessage === "2") {
        await replyFlexMessage(replyToken);
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

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${LINE_ACCESS_TOKEN}`,
  };

  const body = {
    replyToken: replyToken,
    messages: [
      {
        type: "flex",
        altText: "Brown Grand Hotel - รีวิวโรงแรม",
        contents: {
          type: "bubble",
          body: {
            type: "box",
            layout: "vertical",
            contents: [
              {
                type: "image",
                url: "https://developers-resource.landpress.line.me/fx/clip/clip3.jpg",
                size: "full",
                aspectMode: "cover",
                aspectRatio: "1:1",
                gravity: "center",
              },
              {
                type: "box",
                layout: "vertical",
                contents: [],
                position: "absolute",
                background: {
                  type: "linearGradient",
                  angle: "0deg",
                  endColor: "#00000000",
                  startColor: "#00000099",
                },
                width: "100%",
                height: "40%",
                offsetBottom: "0px",
                offsetStart: "0px",
                offsetEnd: "0px",
              },
              {
                type: "box",
                layout: "vertical",
                contents: [
                  //   {
                  //     type: "box",
                  //     layout: "vertical",
                  //     contents: [
                  //       {
                  //         type: "text",
                  //         text: "Brown Grand Hotel",
                  //         size: "xl",
                  //         color: "#ffffff",
                  //         weight: "bold",
                  //       },
                  //       {
                  //         type: "box",
                  //         layout: "baseline",
                  //         contents: [
                  //           {
                  //             type: "icon",
                  //             url: "https://via.placeholder.com/20x20",
                  //           },
                  //           {
                  //             type: "icon",
                  //             url: "https://via.placeholder.com/20x20",
                  //           },
                  //           {
                  //             type: "icon",
                  //             url: "https://via.placeholder.com/20x20",
                  //           },
                  //           {
                  //             type: "icon",
                  //             url: "https://via.placeholder.com/20x20",
                  //           },
                  //           {
                  //             type: "icon",
                  //             url: "https://via.placeholder.com/20x20",
                  //           },
                  //           {
                  //             type: "text",
                  //             text: "4.0",
                  //             color: "#a9a9a9",
                  //             size: "sm",
                  //           },
                  //         ],
                  //         spacing: "xs",
                  //       },
                  //       {
                  //         type: "box",
                  //         layout: "horizontal",
                  //         contents: [
                  //           {
                  //             type: "text",
                  //             text: "¥62,000",
                  //             color: "#ffffff",
                  //             size: "md",
                  //             flex: 0,
                  //             align: "end",
                  //           },
                  //           {
                  //             type: "text",
                  //             text: "¥82,000",
                  //             color: "#a9a9a9",
                  //             decoration: "line-through",
                  //             size: "sm",
                  //             align: "end",
                  //           },
                  //         ],
                  //         spacing: "lg",
                  //       },
                  //     ],
                  //     spacing: "xs",
                  //   },
                  {
                    type: "button",
                    style: "primary",
                    color: "#00B050",
                    action: {
                      type: "uri",
                      label: "ดูรายละเอียด",
                      uri: "https://your-hotel.com",
                    },
                  },
                ],
                position: "absolute",
                offsetBottom: "0px",
                offsetStart: "0px",
                offsetEnd: "0px",
                paddingAll: "20px",
              },
            ],
            paddingAll: "0px",
          },
          //   "footer": {
          //     "type": "box",
          //     "layout": "vertical",
          //     "spacing": "sm",
          //     "contents": [
          //       {
          //         "type": "button",
          //         "style": "primary",
          //         "color": "#00B050",
          //         "action": {
          //           "type": "uri",
          //           "label": "ดูรายละเอียด",
          //           "uri": "https://your-hotel.com"
          //         }
          //       }
          //     ]
          //   }
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
    Authorization: `Bearer ${LINE_ACCESS_TOKEN}`,
  };

  const body = {
    replyToken: replyToken,
    messages: [
      {
        type: "flex",
        altText: "เลือกไฟล์ที่ต้องการดาวน์โหลด",
        contents: {
          type: "carousel",
          contents: [
            {
              type: "bubble",
              body: {
                type: "box",
                layout: "vertical",
                contents: [
                  {
                    type: "text",
                    text: "ไฟล์ 1: คู่มือการใช้งาน",
                    weight: "bold",
                    size: "lg",
                  },
                  { type: "text", text: "PDF - 10MB", wrap: true, size: "sm" },
                ],
              },
              footer: {
                type: "box",
                layout: "vertical",
                contents: [
                  {
                    type: "button",
                    style: "primary",
                    color: "#00B050",
                    action: {
                      type: "uri",
                      label: "ดาวน์โหลด PDF",
                      uri: "https://moevethailand-my.sharepoint.com/:b:/g/personal/atchariyapon_k_moevedigital_com/ESer7F0O7mBHlsOORTT6LGUBpSAD5IfkUOy4SU_i4ATsBA?e=irmAmi",
                    },
                  },
                ],
              },
            },
            {
              type: "bubble",
              body: {
                type: "box",
                layout: "vertical",
                contents: [
                  {
                    type: "text",
                    text: "ไฟล์ 2: รายงานการขาย",
                    weight: "bold",
                    size: "lg",
                  },
                  { type: "text", text: "Excel - 5MB", wrap: true, size: "sm" },
                ],
              },
              footer: {
                type: "box",
                layout: "vertical",
                contents: [
                  {
                    type: "button",
                    style: "primary",
                    color: "#007BFF",
                    action: {
                      type: "uri",
                      label: "ดาวน์โหลด Excel",
                      uri: "https://your-server.com/files/sales.xlsx",
                    },
                  },
                ],
              },
            },
            {
              type: "bubble",
              body: {
                type: "box",
                layout: "vertical",
                contents: [
                  {
                    type: "text",
                    text: "ไฟล์ 3: สัญญาจ้าง",
                    weight: "bold",
                    size: "lg",
                  },
                  { type: "text", text: "Word - 2MB", wrap: true, size: "sm" },
                ],
              },
              footer: {
                type: "box",
                layout: "vertical",
                contents: [
                  {
                    type: "button",
                    style: "primary",
                    color: "#FF5733",
                    action: {
                      type: "uri",
                      label: "ดาวน์โหลด Word",
                      uri: "https://your-server.com/files/contract.docx",
                    },
                  },
                ],
              },
            },
          ],
        },
      },
    ],
  };

  await axios.post(url, body, { headers });
}
