const express = require("express");
const axios = require("axios");
const fileDatas = require("./fileName");
require("dotenv").config();
const app = express();
const PORT = 3000;
const { Message_Token } = process.env;
const LINE_ACCESS_TOKEN = Message_Token;
const xlsx = require("xlsx");
const { loadMasterData } = require("./util");
app.use(express.json());

let masterData = []; // ตัวแปรเก็บข้อมูล Master Data
async function initializeMasterData() {
  try {
    const res = await loadMasterData();
    console.log("loadmaster", res);
    masterData = res;
  } catch (error) {
    masterData = fileDatas;
  }
  return masterData;
}
app.get("/", async (req, res) => {
  await initializeMasterData();
  res.send(masterData);
});
app.get("/load-master", async (req, res) => {
  await initializeMasterData();
  res.send("load success");
});

app.get("/clear-master", async (req, res) => {
  masterData = [];

  console.log("clear data");
  res.send("clear success");
});
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
      if (
        userMessage.includes("แบบฟอร์มตอบรับเข้าร่วมโครงการ")
        // ||        userMessage === "1"
      ) {
        replyText = "นี่คือเมนูของเราครับ";
        await replyFlexFiles(replyToken);
      }
      //   else if (userMessage.includes("เมนูอาหาร") || userMessage === "2") {
      //     await replyFlexMessage(replyToken);
      //   }
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

app.listen(PORT, async () => {
  // await initializeMasterData();
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
                url: "https://moevethailand-my.sharepoint.com/:i:/g/personal/pokkate_e_moevedigital_com/EUfTe33PZO9Pl2Rt7KAwTX8BGPxFZzXwlTpAijUCPpeLvg?e=lqVBKU",
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
                height: "50%",
                offsetBottom: "0px",
                offsetStart: "0px",
                offsetEnd: "0px",
              }, //เงา
              {
                type: "box",
                layout: "vertical",
                contents: [
                  {
                    type: "box",
                    layout: "vertical",
                    contents: [
                      {
                        type: "text",
                        text: "Brown Grand Hotel",
                        size: "xl",
                        color: "#ffffff",
                        weight: "bold",
                      },
                      // {
                      //   type: "box",
                      //   layout: "baseline",
                      //   contents: [
                      //     {
                      //       type: "icon",
                      //       url: "https://via.placeholder.com/20x20",
                      //     },
                      //     {
                      //       type: "icon",
                      //       url: "https://via.placeholder.com/20x20",
                      //     },
                      //     {
                      //       type: "icon",
                      //       url: "https://via.placeholder.com/20x20",
                      //     },
                      //     {
                      //       type: "icon",
                      //       url: "https://via.placeholder.com/20x20",
                      //     },
                      //     {
                      //       type: "icon",
                      //       url: "https://via.placeholder.com/20x20",
                      //     },
                      //     {
                      //       type: "text",
                      //       text: "4.0",
                      //       color: "#a9a9a9",
                      //       size: "sm",
                      //     },
                      //   ],
                      //   spacing: "xs",
                      // },
                      // {
                      //   type: "box",
                      //   layout: "horizontal",
                      //   contents: [
                      //     {
                      //       type: "text",
                      //       text: "¥62,000",
                      //       color: "#ffffff",
                      //       size: "md",
                      //       flex: 0,
                      //       align: "end",
                      //     },
                      //     {
                      //       type: "text",
                      //       text: "¥82,000",
                      //       color: "#a9a9a9",
                      //       decoration: "line-through",
                      //       size: "sm",
                      //       align: "end",
                      //     },
                      //   ],
                      //   spacing: "lg",
                      // },
                    ],
                    spacing: "xs",
                    paddingBottom: "4px",
                  },
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
                paddingAll: "10px",
                paddingBottom: "10px",
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
  let res = masterData;
  if (res.length === 0) {
    res = await initializeMasterData();
  }

  const url = "https://api.line.me/v2/bot/message/reply";
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${LINE_ACCESS_TOKEN}`,
  };
  console.log("res", res);
  const body = {
    replyToken: replyToken,
    messages: [
      {
        type: "flex",
        altText: "เลือกไฟล์ที่ต้องการดาวน์โหลด",
        contents: {
          type: "carousel",
          contents: res.map((fileData) => {
            return {
              type: "bubble",
              body: {
                type: "box",
                layout: "vertical",
                contents: [
                  {
                    type: "text",
                    text: fileData.label,
                    wrap: true,
                    maxLines: 3,
                    weight: "bold",
                    size: "lg",
                  },
                  // { type: "text", text: "PDF - 10MB", wrap: true, size: "sm" },
                ],
              },
              footer: {
                type: "box",
                layout: "vertical",
                contents: [
                  {
                    type: "button",
                    style: "primary",
                    color: fileData.color,
                    action: {
                      type: "uri",
                      label: "ดาวน์โหลด",
                      uri: fileData.url,
                    },
                  },
                ],
              },
            };
          }),
        },
      },
    ],
  };

  await axios.post(url, body, { headers });
}
