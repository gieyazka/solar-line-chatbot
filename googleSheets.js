require("dotenv").config();
const { google } = require("googleapis");

// ✅ ตั้งค่า Google Sheets API
const sheets = google.sheets({
    version: "v4",
    auth: process.env.GOOGLE_SHEETS_API_KEY
});

// ✅ ฟังก์ชันโหลดข้อมูลจาก Google Sheets
async function loadGoogleSheetData() {
    try {
        console.log("📥 กำลังโหลดข้อมูลจาก Google Sheets...");
        
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: process.env.SPREADSHEET_ID,
            range: `${process.env.SHEET_NAME}!A1:Z1000`
        });

        const rows = response.data.values;
        if (!rows || rows.length === 0) {
            console.log("❌ ไม่มีข้อมูลใน Google Sheets");
            return [];
        }

        // ✅ แปลงข้อมูลให้เป็น JSON
        const headers = rows[0];
        const jsonData = rows.slice(1).map(row => {
            let obj = {};
            headers.forEach((header, index) => {
                obj[header] = row[index] || "";
            });
            return obj;
        });

        console.log("✅ โหลดข้อมูลสำเร็จ!");
        return jsonData;
    } catch (error) {
        console.error("❌ โหลดข้อมูลไม่สำเร็จ:", error.message);
        return [];
    }
}

module.exports = { loadGoogleSheetData };
