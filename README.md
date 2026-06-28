-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
อธิบายเพิ่มเติม
- การสร้างrepo ใน github จากลิงค์
  
 https://www.google.com/search?q=%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B8%AA%E0%B8%A3%E0%B9%89%E0%B8%B2%E0%B8%87repo+%E0%B9%83%E0%B8%99+github&rlz=1C1YTUH_thTH1018TH1018&oq=%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B8%AA%E0%B8%A3%E0%B9%89%E0%B8%B2%E0%B8%87repo+%E0%B9%83%E0%B8%99+git&gs_lcrp=EgZjaHJvbWUqBwgBECEYoAEyBggAEEUYOTIHCAEQIRigATIHCAIQIRigAdIBCTIzNjk5ajBqOagCALACAA&sourceid=chrome&ie=UTF-8

-การใช้ git 
https://devhub.in.th/th/learn/git/git-pull
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
การรันโปรแกรมจะมี 2 แบบ

แบบที่ 1 

-การรันแบบ  deploy จากเครื่องตัวเอง (CLI)

1.เปิดโฟเดอร์ DEV_POOL_2026

2.เปิดโฟเดอร์ server/ใน C:\Users\Nitro 5\DEV_POOL_2026\server> 

3.**ที่ต้องติดตั้ง**

ติดตั้ง# ติดตั้ง dependencies 
npm install

# ติดตั้งเฉพาะที่จำเป็น
npm install express node-fetch

# Local development
node server.js

# หรือใช้ nodemon
npm run dev

4.ต้องการรันโปรแกรม พิมพ์ที่ terminal:node server.js  

5.กด F5  จะขึ้นลิงค์ file:///C:/Users/Nitro%205/DEV_POOL_2026/server/index.html 

จะได้ การรันแบบ  deploy จากเครื่องตัวเอง (CLI)

----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
แบบที่2

-การรันแบบ  deploy จากหน้า page Vercel


ลักษณะโครงสร้างไฟล์ 


devpool-api-server/


├── server.js          ← ไฟล์หลัก (ต้องมี)

├── package.json       ← dependencies (ต้องมี)

├── vercel.json        ← ไฟล์นี้ (ต้องมี)

├── public/            ← โฟลเดอร์นี้ (ต้องมี)

│   └── index.html     ← ไฟล์หน้าเว็บ (ต้องมี)

│   └── style.css      ← (ถ้ามี)

│   └── script.js      ← (ถ้ามี)

└── node_modules/      ← (สร้างอัตโนมัติ)


1.เปิดโฟเดอร์ DEV_POOL_2026

2.เปิดโฟเดอร์ devpool-api-server ใน C:\Users\Nitro 5\DEV_POOL_2026\devpool-api-server

3.**ที่ต้องติดตั้ง**

#  ติดตั้ง Vercel CLI

npm install -g vercel

#  เข้าสู่ระบบ Vercel

vercel login

#  Deploy

vercel

#  เลือกตั้งค่า (ตอบ Yes ทั้งหมด)

#   - Scope: your-account

#   - Link to existing project? No

#   - Project name: devpool-api-server

#   - Directory: ./

#   - Override settings? No

#   รอจนเสร็จ แล้วได้ลิงก์ เช่น:

#   https://devpool-api-server.vercel.app

#   Deploy ด้วยคำสั่ง

vercel --prod

#  ทดสอบเปิดเว็บ

#    https://devpool-api-server.vercel.app

#  ทดสอบ API

#  https://devpool-api-server.vercel.app/api/oil-price

# Deploy ทุกครั้งที่ต้องการอัปเดต

vercel --prod

# หรือถ้าต้องการ Deploy แบบ Preview (ทดสอบ)
vercel

4.ต้องการรันโปรแกรม พิมพ์ที่ terminal:vercel --prod

5.กด F5 จะขึ้นลิงค์  file:///C:/Users/Nitro%205/DEV_POOL_2026/devpool-api-server/public/index.html 

หรือ จะดูในลิงค์ตรง deploy vercel ที่ลิงค์ https://project-2ve7o.vercel.app/ 

-------------------------------------------------------------------------------------------------------

รูปแบบที่ได้
https://github.com/hnume/DEV_POOL_2026/blob/main/README.m/%E0%B8%AB%E0%B8%99%E0%B9%89%E0%B8%B2%E0%B9%80%E0%B8%9E%E0%B8%88.jpg
1. มี3ธีม ประกอบด้วย  สะว่าง,มืด,อัตโนมัติทุกครั้งที่เปลี่ยนธีม จะบอก สถานะที่หน้าเว็บ
2. เปลี่ยนภาษา ไทย-EN มีสถานะบอก ทุกครั้งที่เปลี่ยนภาษา
3. สามารถพิมพ์ข้อความแบบเรียลไทม์ได้ ทั้งภาษาไทย-EN
4. สามารถ กดไลท์ได้-และกดยกเลิกไลท์ ได้ มีสถานะบอกยอดไลท์ ที่กด และยกเลิก




*****************************************************************************************************************************************************************************************
คำอธิบายการทำงานของโค้ด HTML, server.js และ package.json อย่างละเอียด
ตามรายละเอียดนี้   https://github.com/hnume/DEV_POOL_2026/blob/main/README.m/%E0%B8%84%E0%B8%B3%E0%B8%AD%E0%B8%98%E0%B8%B4%E0%B8%9A%E0%B8%B2%E0%B8%A2%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B8%97%E0%B8%B3%E0%B8%87%E0%B8%B2%E0%B8%99%E0%B8%82%E0%B8%AD%E0%B8%87%E0%B8%A3%E0%B8%B0%E0%B8%9A%E0%B8%9A%20DevPool.pdf




