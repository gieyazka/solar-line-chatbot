const axios = require("axios");
const xlsx = require("xlsx");

const SPREADSHEET_ID = "1K-K1DNd35RVG0aUWrJ2qv_iScyAltpy_yJYLRpDHfXk";
const GID = "0"; // ถ้าเป็น Sheet อื่นให้เปลี่ยนค่า GID
const SHEET_URL = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/gviz/tq?tqx=out:json&gid=${GID}`;
console.log("SHEET_URL", SHEET_URL);
// ✅ ฟังก์ชันโหลดข้อมูลจาก Excel และแปลงเป็น JSON
async function loadMasterData() {
  try {
    console.time("⏳ โหลดข้อมูลจาก OneDrive");
    console.log("📥 กำลังโหลดข้อมูลจาก OneDrive...");
    const response = await axios.get(SHEET_URL);
    let data = response.data;
    data = JSON.parse(data.substr(47).slice(0, -2));
    const headerArr = data.table.rows.splice(0, 1);
    const headers = headerArr[0].c.map((cell) => cell.v);
    const jsonData = data.table.rows.map((row, index) => {
      let obj = {};
      row.c.forEach((cell, index) => {
        obj[headers[index]] = cell ? cell.v : ""; // กรองค่า null ออก
      });
      return obj;
    });
    console.log("✅ โหลดข้อมูลสำเร็จ!");
    console.timeEnd("⏳ โหลดข้อมูลจาก OneDrive");
    return jsonData;
  } catch (error) {
    console.error("❌ โหลดข้อมูลไม่สำเร็จ:", error.message);
    return [];
  }
}

// ✅ Export ฟังก์ชันเพื่อให้ไฟล์อื่นใช้งานได้
module.exports = { loadMasterData };
