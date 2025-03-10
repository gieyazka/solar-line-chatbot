# ใช้ Node.js เวอร์ชันล่าสุด
FROM node:18-alpine

# กำหนด Working Directory
WORKDIR /app

# คัดลอกไฟล์ package.json และติดตั้ง Dependencies
COPY package.json ./
RUN npm install

# คัดลอกโค้ดทั้งหมดไปยัง Container
COPY . .

# ระบุ Port ที่จะใช้
EXPOSE 3000

# รันเซิร์ฟเวอร์
CMD ["npm", "start"]
