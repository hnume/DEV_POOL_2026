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





คำอธิบายการทำงานของโค้ด HTML, server.js และ package.json อย่างละเอียด
สารบัญ
ภาพรวมระบบ

1 package.json - การจัดการ dependencies

2 server.js - Backend API Server

3 HTML Frontend - การเชื่อมต่อกับ Backend

4 การทำงานแบบ End-to-End

5 การดีบักและการทดสอบ



ภาพรวมระบบ
ระบบนี้เป็นเว็บแอปพลิเคชัน Full-Stack ที่ประกอบด้วย:


┌─────────────────────────────────────────────────────────────┐
│                    Frontend (HTML/CSS/JS)                   │
│  - แสดงโปรไฟล์ผู้ใช้                                         │
│  - ฟอร์มพิมพ์ข้อความแบบ Real-time                          │
│  - ปุ่ม Like/Unlike                                         │
│  - แสดงราคาน้ำมันบางจาก (iframe)                           │
│  - ระบบเปลี่ยนธีมและภาษา                                    │
└────────────────────┬────────────────────────────────────────┘
                     │ HTTP/HTTPS
                     ▼
┌─────────────────────────────────────────────────────────────┐
│                  Backend (Express.js)                       │
│  - API Endpoints 10+ Route                                  │
│  - In-Memory Database (Likes, Messages)                     │
│  - Cache System (Oil Price, Users)                         │
│  - CORS Middleware                                          │
│  - Static File Server                                       │
└────────────────────┬────────────────────────────────────────┘
                     │
         ┌───────────┴───────────┐
         ▼                       ▼
┌─────────────────┐   ┌─────────────────────────┐
│  External APIs  │   │   Local Memory          │
│  - Bangchak Oil │   │   - Likes Database      │
│  - JSONPlace-   │   │   - Messages Database   │
│    holder       │   │   - User Cache          │
└─────────────────┘   └─────────────────────────┘






package.json - การจัดการ dependencies

{
  "name": "devpool-project",
  "version": "1.0.0",
  "description": "DevPool 2026 Project - Full Stack Application",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "node-fetch": "^3.3.2"
  },
  "devDependencies": {
    "nodemon": "^3.0.1"
  }
}



คำอธิบายแต่ละส่วน:
1. name - ชื่อโปรเจกต์
ใช้ระบุโปรเจกต์ในระบบ npm

"devpool-project" - ชื่อที่ตั้งให้กับโปรเจกต์นี้

2. version - เวอร์ชันของโปรเจกต์
ใช้ SemVer (Semantic Versioning) รูปแบบ major.minor.patch

"1.0.0" - เวอร์ชันเริ่มต้น

3. description - คำอธิบายโปรเจกต์
ข้อความสั้น ๆ บอกว่าโปรเจกต์นี้คืออะไร

4. main - ไฟล์หลักของโปรเจกต์
"server.js" - เมื่อรัน node . จะเรียกไฟล์นี้

5. scripts - คำสั่งที่ใช้รันโปรเจกต์


   "start": "node server.js"     // รันแบบ production
"dev": "nodemon server.js"    // รันแบบ development (auto-reload)



6. dependencies - Dependencies ที่จำเป็นสำหรับ Production
express (^4.18.2): Web Framework หลัก

^ หมายถึง ยอมรับเวอร์ชัน patch และ minor ที่สูงกว่า

ใช้สร้าง API Server, Middleware, Routing

node-fetch (^3.3.2): Library สำหรับทำ HTTP Request

ใช้ดึงข้อมูลจาก API ภายนอก (Bangchak, JSONPlaceholder)

เวอร์ชัน 3.x รองรับ ES Module

7. devDependencies - Dependencies สำหรับ Development
nodemon (^3.0.1): เครื่องมือ reload อัตโนมัติ

เมื่อแก้ไขไฟล์ server.js จะ restart server ทันที


server.js - Backend API Server


ส่วนที่ 1: การตั้งค่าและการ Import


const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 5500;




รรทัด	                                                                            คำอธิบาย
require('express')	                                         Import Express Framework สำหรับสร้าง Web Server
require('path')	                                             Import Path Module สำหรับจัดการเส้นทางไฟล์
const app = express()	                                        สร้าง instance ของ Express Application
const port = process.env.PORT || 5500	                       กำหนดพอร์ตจาก Environment Variable หรือใช้ 5500



ส่วนที่ 2: Middleware Configuration


// 1. ตั้งค่า Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


บรรทัด	                                                                   คำอธิบาย
express.json()	                                       Middleware แปลง JSON body ใน Request ให้เป็น JavaScript Object
express.urlencoded({ extended: true })	               Middleware แปลง Form Data (application/x-www-form-urlencoded)




การทำงาน:

Client → POST /api/messages (JSON body)
         ↓
   express.json() แปลง JSON → { userId: "1", message: "Hello" }
         ↓
   ต่อไปยัง Route Handler



CORS Middleware


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});




บรรทัด	                                                       คำอธิบาย
res.header('Access-Control-Allow-Origin', '*')	       อนุญาตทุก Domain ให้เรียก API
res.header('Access-Control-Allow-Headers', ...)	       กำหนด Header ที่อนุญาต
res.header('Access-Control-Allow-Methods', ...)	       กำหนด HTTP Methods ที่อนุญาต
if (req.method === 'OPTIONS')	                          จัดการ Preflight Request ของ CORS
next()	                                                ส่งต่อ Request ไปยัง Route ถัดไป






   Preflight Request คืออะไร?

   1. Browser: "ฉันขอส่ง POST ไปที่ /api/likes/1 นะ"
   → OPTIONS /api/likes/1 (Preflight)
2. Server: "OK อนุญาต"
   → 200 OK
3. Browser: ส่ง Request จริง
   → POST /api/likes/1

Static File Server
app.use(express.static(__dirname));


บรรทัด	                                             คำอธิบาย
express.static(__dirname)	                  ให้บริการไฟล์ Static ในโฟลเดอร์ปัจจุบัน
__dirname	                                  พาธของโฟลเดอร์ที่ไฟล์ server.js อยู่



ผลลัพธ์:



http://localhost:5500/index.html    → เปิดไฟล์ index.html
http://localhost:5500/style.css     → เปิดไฟล์ style.css
http://localhost:5500/script.js     → เปิดไฟล์ script.js



ส่วนที่ 3: In-Memory Database


const likesDatabase = {
    '1': 87,
    '2': 45,
    '3': 120
};

const messagesDatabase = [];
const userCache = {};
const OIL_CACHE_TTL = 5 * 60 * 1000; // 5 นาที
let oilCache = null;
let oilCacheTime = 0;


ตัวแปร	                                                                                           คำอธิบาย
likesDatabase                                                           	เก็บจำนวนไลค์ของแต่ละ User (Key: userId, Value: likeCount)
messagesDatabase                                                        	เก็บข้อความทั้งหมด (Array)
userCache	                                                                เก็บข้อมูล User ที่ดึงมาจาก JSONPlaceholder
OIL_CACHE_TTL	                                                            Time-To-Live ของ Cache ราคาน้ำมัน (5 นาที)
oilCache	                                                                เก็บข้อมูลราคาน้ำมันที่ดึงมาแล้ว
oilCacheTime	                                                            เวลาที่ดึงข้อมูลราคาน้ำมันครั้งล่าสุด




ส่วนที่ 4: ฟังก์ชัน Parse ราคาน้ำมัน

function parseBangchakOilPrice(html) {
    const oilTypes = [
        'ดีเซล B7', 'แก๊สโซฮอล์ 95', 'เบนซิน 95',
        'แก๊สโซฮอล์ 91', 'E85', 'ดีเซล B20',
        'ดีเซล พรีเมี่ยม', 'แก๊สโซฮอล์ E20'
    ];
    
    // ... ดึงข้อมูลจาก HTML ...
    
    return {
        date: date,
        prices: oilData,
        note: 'ราคาขายปลีก กทม. ที่ยังไม่รวมภาษีบำรุงท้องถิ่น กทม.'
    };
}



ขั้นตอนการทำงาน:

1 กำหนดชนิดน้ำมัน - 8 ชนิดตามเว็บบางจาก

2 ค้นหาวันที่ - ใช้ Regular Expression หาวันที่ใน HTML

3 ดึงข้อมูลราคา - ใช้ Regex และการแยก Table

4 Fallback - ถ้าแยกไม่ได้ ใช้ข้อมูลตัวอย่าง

ตัวอย่าง Regular Expression ที่ใช้:


// หาวันที่
/วันที่\s*(\d{1,2}\/\d{1,2}\/\d{4})/
// หาราคา
/(\d{2,3}\.\d{2})/g
// หา Table
/<table[^>]*>([\s\S]*?)<\/table>/i


ส่วนที่ 5: API Endpoints
5.1 GET /api/oil-price - ดึงราคาน้ำมัน

app.get('/api/oil-price', async (req, res) => {
    try {
        // 1. ตรวจสอบ Cache
        const now = Date.now();
        if (oilCache && (now - oilCacheTime) < OIL_CACHE_TTL) {
            return res.json({
                success: true,
                data: oilCache,
                source: 'Cache',
                timestamp: new Date().toISOString()
            });
        }

        // 2. ดึงข้อมูลจาก Bangchak
        const fetch = (await import('node-fetch')).default;
        const response = await fetch('https://oil-price.bangchak.co.th/BcpOilPrice1/th');
        
        // 3. Parse HTML
        const html = await response.text();
        const oilData = parseBangchakOilPrice(html);
        
        // 4. เก็บ Cache
        oilCache = oilData;
        oilCacheTime = now;
        
        // 5. ส่ง Response
        res.json({ success: true, data: oilData, source: 'Bangchak' });
    } catch (error) {
        // 6. Error Handling - ใช้ Cache เก่าถ้ามี
        if (oilCache) {
            return res.json({ success: true, data: oilCache, source: 'Cache (Stale)' });
        }
        res.status(500).json({ success: false, error: error.message });
    }
});


การทำงานแบบ Step-by-Step:

ขั้นตอน	                           การทำงาน	                                        ผลลัพธ์
1	                          ตรวจสอบ Cache	                                     ถ้ามีและไม่เกิน 5 นาที → ส่งข้อมูล Cache ทันที
2                         	await import('node-fetch')	                        โหลด node-fetch แบบ Dynamic Import
3                         	fetch(apiUrl)	                                      ส่ง Request ไปยัง Bangchak Oil Price
4	                          response.text()	                                     รับ HTML Response
5	                          parseBangchakOilPrice(html)	                          แปลง HTML เป็น JSON
6                         	เก็บ Cache	                                            บันทึกข้อมูลและเวลา
7	                         ส่ง Response	                                            กลับไปยัง Client




5.2 GET /api/users/:id - ดึงข้อมูลผู้ใช้



app.get('/api/users/:id', async (req, res) => {
    try {
        const userId = req.params.id || '1';
        
        // 1. ตรวจสอบ Cache
        if (userCache[userId]) {
            return res.json({
                success: true,
                data: userCache[userId],
                source: 'Cache'
            });
        }
        
        // 2. ดึงจาก JSONPlaceholder
        const fetch = (await import('node-fetch')).default;
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
        const data = await response.json();
        
        // 3. เก็บ Cache
        userCache[userId] = data;
        
        res.json({ success: true, data: data, source: 'JSONPlaceholder' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});



Parameter:

-req.params.id - ดึง userId จาก URL Path

-?limit=10 - ใช้กับ GET /api/posts


5.3 POST /api/likes/:userId - อัปเดตไลค์

app.post('/api/likes/:userId', (req, res) => {
    const userId = req.params.userId || '1';
    const { action } = req.body;
    
    // 1. ตรวจสอบ Action
    if (action === 'like') {
        likesDatabase[userId] = (likesDatabase[userId] || 0) + 1;
    } else if (action === 'unlike') {
        likesDatabase[userId] = Math.max(0, (likesDatabase[userId] || 0) - 1);
    } else {
        return res.status(400).json({ error: 'Invalid action' });
    }
    
    res.json({
        success: true,
        userId: userId,
        likes: likesDatabase[userId],
        action: action
    });
});


ตัวอย่าง Request:


POST /api/likes/1 HTTP/1.1
Content-Type: application/json

{
    "action": "like"
}

ตัวอย่าง Response:

{
    "success": true,
    "userId": "1",
    "likes": 88,
    "action": "like",
    "timestamp": "2026-06-27T10:30:00.000Z"
}


5.4 POST /api/messages - บันทึกข้อความ

app.post('/api/messages', (req, res) => {
    const { userId, message } = req.body;
    
    // 1. Validation
    if (!message || message.trim() === '') {
        return res.status(400).json({
            success: false,
            error: 'Message is required'
        });
    }
    
    // 2. สร้างข้อความใหม่
    const newMessage = {
        id: messagesDatabase.length + 1,
        userId: userId || '1',
        message: message.trim(),
        timestamp: new Date().toISOString()
    };
    
    // 3. เก็บใน Database
    messagesDatabase.push(newMessage);
    
    // 4. จำกัดจำนวนข้อความ
    if (messagesDatabase.length > 100) {
        messagesDatabase.splice(0, messagesDatabase.length - 100);
    }
    
    res.json({ success: true, data: newMessage });
});



5.5 GET /api/all - ดึงข้อมูลทั้งหมด

app.get('/api/all', async (req, res) => {
    try {
        // 1. ดึงข้อมูลพร้อมกัน (Parallel)
        const fetch = (await import('node-fetch')).default;
        const [userResponse, postsResponse] = await Promise.all([
            fetch('https://jsonplaceholder.typicode.com/users/1'),
            fetch('https://jsonplaceholder.typicode.com/posts?_limit=10')
        ]);

        const user = await userResponse.json();
        const posts = await postsResponse.json();
        
        // 2. ดึงราคาน้ำมันจาก Cache
        let oilData = null;
        if (oilCache && (Date.now() - oilCacheTime) < OIL_CACHE_TTL) {
            oilData = oilCache;
        }
        
        // 3. รวมข้อมูลทั้งหมด
        res.json({
            success: true,
            data: {
                user: user,
                posts: posts,
                oilPrice: oilData,
                likes: likesDatabase['1'] || 0,
                recentMessages: messagesDatabase.slice(-5).reverse()
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});




Promise.all การทำงาน:


เริ่มต้น
   ├─ Request ไป JSONPlaceholder (User) ──┐
   ├─ Request ไป JSONPlaceholder (Posts) ─┤─→ รอจนเสร็จทั้งหมด
   └─ ใช้ข้อมูลจาก Cache (Oil Price) ─────┘
              ↓
        รวมข้อมูลทั้งหมด
              ↓
        ส่ง Response กลับ




ส่วนที่ 6: การรัน Server


// ส่งออก app สำหรับ Vercel Serverless
module.exports = app;

// ถ้าไม่ใช่ Vercel (รันตรงๆ) ให้เริ่มต้น Server
if (require.main === module) {
    app.listen(port, () => {
        console.log(`🚀 Server is running on http://localhost:${port}`);
        console.log(`📄 Open index.html at http://localhost:${port}/index.html`);
        console.log(`\n📌 API Endpoints:`);
        console.log(`   GET  /api/oil-price        - ดึงข้อมูลราคาน้ำมันบางจาก (JSON) + Cache 5 นาที`);
        // ... แสดง endpoints ทั้งหมด
    });
}

บรรทัด	                                                              คำอธิบาย
module.exports = app	                                          ส่งออก app เพื่อใช้กับ Vercel Serverless
if (require.main === module)	                                  ตรวจสอบว่าถูกเรียกโดยตรง (ไม่ใช่ import)
app.listen(port, callback)	                                     เริ่มต้น Web Server ที่พอร์ต 5500



HTML Frontend - การเชื่อมต่อกับ Backend



1. การโหลดข้อมูลผู้ใช้
async function loadUserData() {
    try {
        userNameDisplay.textContent = 'กำลังโหลด...';
        
        const response = await fetch('https://jsonplaceholder.typicode.com/users/1');
        const user = await response.json();
        userNameDisplay.textContent = user.name;
        isUserLoaded = true;
        
        // โหลดยอดไลค์จาก Server
        const likesResponse = await fetch('/api/likes/1');
        const likesData = await likesResponse.json();
        likeCount = likesData.likes;
        updateLikeDisplay();
    } catch (error) {
        // Fallback: ใช้ข้อมูลตัวอย่าง
        userNameDisplay.textContent = 'ไม่พบข้อมูล';
    }
}

2. การกด Like

likeBtn.addEventListener('click', async function() {
    if (!isUserLoaded) return;
    
    isLiked = !isLiked;
    const action = isLiked ? 'like' : 'unlike';
    
    // ส่ง Request ไป Server
    const response = await fetch(`/api/likes/1`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: action })
    });
    
    const data = await response.json();
    likeCount = data.likes;
    updateLikeDisplay();
    
    if (isLiked) {
        this.classList.add('liked');
        showToast('❤️', 'คุณไลค์แล้ว');
    } else {
        this.classList.remove('liked');
        showToast('💔', 'เลิกไลค์แล้ว');
    }
});



3. การส่งข้อความ


// การส่งข้อความผ่าน API
async function sendMessage(message) {
    const response = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            userId: '1',
            message: message
        })
    });
    
    const result = await response.json();
    if (result.success) {
        console.log('บันทึกข้อความสำเร็จ:', result.data);
    }
}

4. การโหลดราคาน้ำมัน

async function loadOilPrice() {
    try {
        const response = await fetch('/api/oil-price');
        const result = await response.json();
        
        if (result.success) {
            const oilData = result.data;
            console.log(`ราคาน้ำมัน ณ วันที่ ${oilData.date}:`);
            oilData.prices.forEach(item => {
                console.log(`${item.type}: ${item.today} บาท`);
            });
        }
    } catch (error) {
        console.error('Error loading oil price:', error);
    }
}



การทำงานแบบ End-to-End
สถานการณ์ที่ 1: ผู้ใช้โหลดหน้าเว็บ

1. Browser: GET /index.html
   Server: ส่งไฟล์ HTML กลับ

2. Browser: โหลด CSS และ JavaScript
   Server: ส่งไฟล์ Static

3. JavaScript: fetch('/api/users/1')
   Server: GET /api/users/1
   Server: ตรวจสอบ Cache → ไม่มี
   Server: fetch('https://jsonplaceholder.typicode.com/users/1')
   JSONPlaceholder: ส่งข้อมูล User
   Server: เก็บ Cache, ส่ง Response
   Browser: แสดงชื่อผู้ใช้

4. JavaScript: fetch('/api/likes/1')
   Server: GET /api/likes/1
   Server: likesDatabase['1'] → 87
   Browser: แสดงยอดไลค์ 87



   สถานการณ์ที่ 2: ผู้ใช้กด Like



   1. User: คลิกปุ่ม Like

2. JavaScript: fetch('/api/likes/1', {
     method: 'POST',
     body: JSON.stringify({ action: 'like' })
   })

3. Server: POST /api/likes/1
   - อ่าน { action: 'like' } จาก req.body
   - likesDatabase['1'] = 88
   - ส่ง Response { likes: 88 }

4. Browser: อัปเดตยอดไลค์เป็น 88
   - เปลี่ยนปุ่มเป็น "เลิกไลท์"
  


   สถานการณ์ที่ 3: ดึงราคาน้ำมัน (มี Cache)


1. JavaScript: fetch('/api/oil-price')

2. Server: GET /api/oil-price
   - ตรวจสอบ Cache: oilCache มีข้อมูล, ยังไม่หมดอายุ
   - ส่ง Response จาก Cache ทันที (ไม่ต้องไปดึงเว็บบางจาก)

3. Browser: แสดงราคาน้ำมัน
   - source: 'Cache'
   - timestamp: เวลาที่ดึงข้อมูลครั้งล่าสุด
  


สถานการณ์ที่ 4: ดึงราคาน้ำมัน (ไม่มี Cache)



1. JavaScript: fetch('/api/oil-price')

2. Server: GET /api/oil-price
   - ตรวจสอบ Cache: oilCache === null หรือหมดอายุ
   - fetch('https://oil-price.bangchak.co.th/BcpOilPrice1/th')
   - รับ HTML Response
   - parseBangchakOilPrice(html) → แปลงเป็น JSON
   - เก็บ Cache
   - ส่ง Response

3. Browser: แสดงราคาน้ำมัน
   - source: 'Bangchak Oil Price'
   - timestamp: ปัจจุบัน
  


การดีบักและการทดสอบ


1. การทดสอบด้วย Postman / cURL


# ทดสอบ GET /api/users/1
curl http://localhost:5500/api/users/1

# ทดสอบ POST /api/likes/1
curl -X POST http://localhost:5500/api/likes/1 \
  -H "Content-Type: application/json" \
  -d '{"action":"like"}'

# ทดสอบ POST /api/messages
curl -X POST http://localhost:5500/api/messages \
  -H "Content-Type: application/json" \
  -d '{"userId":"1","message":"Hello DevPool"}'

# ทดสอบ GET /api/all
curl http://localhost:5500/api/all

2. การตรวจสอบ Log

   // ใน server.js
console.log('🚀 Server is running on http://localhost:5500');
console.log(`📌 GET /api/oil-price - ${new Date().toISOString()}`);

// ใน API Handler
console.log(`[${new Date().toISOString()}] GET /api/users/${userId}`);


3. การตรวจสอบ Network ใน Browser


Chrome DevTools → Network Tab
1. ดู Request/Response ทั้งหมด
2. ตรวจสอบ Status Code
3. ดู Headers (CORS)
4. ดู Response Body
5. วัด Performance (Time)


4. Error Handling

   // Frontend
async function fetchData() {
    try {
        const response = await fetch('/api/oil-price');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch failed:', error);
        // แสดงข้อความให้ผู้ใช้
        showToast('❌', 'เกิดข้อผิดพลาดในการโหลดข้อมูล');
        // Fallback: ใช้ข้อมูลเก่า
        return getCachedData();
    }
}
   

สรุปสถาปัตยกรรม

┌─────────────────────────────────────────────────────────────────┐
│                         CLIENT (Browser)                       │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │               index.html (User Interface)               │   │
│  │  - Profile Display         - Theme/Language Switcher   │   │
│  │  - Live Input Preview      - Like Button              │   │
│  │  - Oil Price Iframe        - Footer                   │   │
│  └────────────────────────┬────────────────────────────────┘   │
│                           │                                     │
│                     fetch() API Calls                          │
│                           │                                     │
│  ┌────────────────────────▼────────────────────────────────┐   │
│  │              JavaScript (Client-side)                    │   │
│  │  - loadUserData()    - likeBtn.click()                  │   │
│  │  - sendMessage()     - loadOilPrice()                   │   │
│  │  - switchLanguage()  - applyTheme()                     │   │
│  └────────────────────────┬────────────────────────────────┘   │
└───────────────────────────┼─────────────────────────────────────┘
                            │ HTTP/HTTPS
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                      SERVER (Node.js)                          │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │              Express.js Application                     │   │
│  │  ┌─────────────────────────────────────────────────┐   │   │
│  │  │           Middleware Layer                      │   │   │
│  │  │  - CORS          - JSON Parser                 │   │   │
│  │  │  - Static Files  - URL Encoded Parser          │   │   │
│  │  └─────────────────────────────────────────────────┘   │   │
│  │                                                         │   │
│  │  ┌─────────────────────────────────────────────────┐   │   │
│  │  │            API Routes (10+ Endpoints)           │   │   │
│  │  │  GET  /api/oil-price     → Bangchak Oil Price │   │   │
│  │  │  GET  /api/users/:id     → JSONPlaceholder    │   │   │
│  │  │  GET  /api/posts         → JSONPlaceholder    │   │   │
│  │  │  GET  /api/likes/:userId → Memory Database   │   │   │
│  │  │  POST /api/likes/:userId → Update Likes      │   │   │
│  │  │  POST /api/messages      → Save Messages     │   │   │
│  │  │  GET  /api/messages      → Get Messages      │   │   │
│  │  │  GET  /api/all           → Aggregate Data    │   │   │
│  │  └─────────────────────────────────────────────────┘   │   │
│  │                                                         │   │
│  │  ┌─────────────────────────────────────────────────┐   │   │
│  │  │           In-Memory Database                   │   │   │
│  │  │  - likesDatabase  (User ID → Likes Count)     │   │   │
│  │  │  - messagesDatabase (Array of Messages)       │   │   │
│  │  │  - userCache      (User ID → User Data)      │   │   │
│  │  │  - oilCache       (Oil Price Data + TTL)     │   │   │
│  │  └─────────────────────────────────────────────────┘   │   │
│  └─────────────────────────────────────────────────────────┘   │
└───────────────────────────┬─────────────────────────────────────┘
                            │
              ┌─────────────┴──────────────┐
              ▼                            ▼
┌─────────────────────────┐  ┌─────────────────────────────┐
│   External APIs         │  │   Static Files              │
│  - Bangchak Oil Price   │  │  - index.html               │
│  - JSONPlaceholder      │  │  - style.css                │
│  - Users, Posts         │  │  - script.js                │
└─────────────────────────┘  └─────────────────────────────┘



ข้อดีและข้อควรระวัง
ข้อดี
Separation of Concerns - แยก Frontend และ Backend ชัดเจน

Caching - ลดการเรียก API ภายนอก เพิ่มความเร็ว

Error Handling - มี Fallback เมื่อ API ภายนอกล้มเหลว

CORS Ready - รองรับการเรียกจากโดเมนอื่น

Stateless - แต่ละ Request เป็นอิสระต่อกัน (ยกเว้น In-Memory DB)

ข้อควรระวัง
In-Memory Database - ข้อมูลหายเมื่อ Restart Server

Cache TTL - ข้อมูลราคาน้ำมันอาจไม่ทันสมัย

No Authentication - ไม่มีระบบ Login/Authorization

Single Point of Failure - ถ้า Server Crash ข้อมูลทั้งหมดหาย

Memory Usage - messagesDatabase จะเก็บข้อมูลเรื่อยๆ (จำกัดที่ 100)

แนวทางการปรับปรุง
ใช้ Database จริง (MongoDB, PostgreSQL)

เพิ่ม Authentication (JWT, Session)

ใช้ Redis แทน In-Memory Cache

เพิ่ม Rate Limiting ป้องกัน DDoS

ใช้ Docker สำหรับ Deployment





