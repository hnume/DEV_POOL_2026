
************อธิบายเพิ่มเติม*********
- การสร้างrepo ใน github  
 จากลิงค์ https://www.google.com/search?q=%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B8%AA%E0%B8%A3%E0%B9%89%E0%B8%B2%E0%B8%87repo+%E0%B9%83%E0%B8%99+github&rlz=1C1YTUH_thTH1018TH1018&oq=%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B8%AA%E0%B8%A3%E0%B9%89%E0%B8%B2%E0%B8%87repo+%E0%B9%83%E0%B8%99+git&gs_lcrp=EgZjaHJvbWUqBwgBECEYoAEyBggAEEUYOTIHCAEQIRigATIHCAIQIRigAdIBCTIzNjk5ajBqOagCALACAA&sourceid=chrome&ie=UTF-8

-การใช้ git 
https://devhub.in.th/th/learn/git/git-pull

..การรันโปรแกรมจะมี 2 แบบ

  ***** แบบที่ 1**************
   
-การรันแบบ  deploy จากเครื่องตัวเอง (CLI)

1.เปิดโฟเดอร์ DEV_POOL_2026

2.เปิดโฟเดอร์ server/ใน C:\Users\Nitro 5\DEV_POOL_2026\server> 

3.****ที่ต้องติดตั้ง*******************

# ติดตั้ง dependencies ใหม่
npm install

# หรือถ้าต้องการติดตั้งเฉพาะที่จำเป็น
npm install express node-fetch

# Local development
node server.js

# หรือใช้ nodemon
npm run dev

4.ต้องการโปรแกรม พิมพ์ที่ terminal:node server.js  

5.กด F5  จะขึ้นลิงค์ file:///C:/Users/Nitro%205/DEV_POOL_2026/server/index.html จะได้ การรันแบบ  deploy จากเครื่องตัวเอง (CLI)


***แบบที่2***
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

3.****ที่ต้องติดตั้ง*******************

Deploy ใหม่ด้วยคำสั่ง
vercel --prod

รือถ้าอยาก Deploy ใหม่ทั้งหมด:


# 1. Deploy ใหม่
vercel --prod

# 2. ทดสอบเปิดเว็บ
#    https://devpool-api-server.vercel.app

# 3. ทดสอบ API
#    https://devpool-api-server.vercel.app/api/oil-price







