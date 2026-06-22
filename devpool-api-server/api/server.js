// server.js - สำหรับ DevPool Project
// รองรับการดึงข้อมูลราคาน้ำมันบางจาก, JSONPlaceholder, ไลค์, และข้อความ

const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 5500;

// ================================================================
// 1. ตั้งค่า Middleware
// ================================================================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// กำหนด CORS Headers
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});

// กำหนดให้โฟลเดอร์ปัจจุบันเป็นที่เก็บ Static Files
app.use(express.static(__dirname));

// ================================================================
// 2. หน่วยความจำจำลอง (In-Memory Database)
// ================================================================

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

// ================================================================
// 3. ฟังก์ชันช่วยในการแยกข้อมูลราคาน้ำมันจาก HTML (ปรับปรุง)
// ================================================================

function parseBangchakOilPrice(html) {
    // ประเภทน้ำมันตามลำดับที่ปรากฏในเว็บบางจาก
    const oilTypes = [
        'ดีเซล B7',
        'แก๊สโซฮอล์ 95',
        'เบนซิน 95',
        'แก๊สโซฮอล์ 91',
        'E85',
        'ดีเซล B20',
        'ดีเซล พรีเมี่ยม',
        'แก๊สโซฮอล์ E20'
    ];

    // ดึงวันที่ - รองรับหลายรูปแบบ
    let date = new Date().toLocaleDateString('th-TH');
    const datePatterns = [
        /วันที่\s*(\d{1,2}\/\d{1,2}\/\d{4})/,
        /วันที่\s*(\d{1,2}-\d{1,2}-\d{4})/,
        /(\d{1,2}\/\d{1,2}\/\d{4})/,
        /(\d{1,2}-\d{1,2}-\d{4})/
    ];
    
    for (const pattern of datePatterns) {
        const match = html.match(pattern);
        if (match) {
            date = match[1];
            break;
        }
    }

    // ดึงข้อมูลราคาน้ำมัน - แยกจากตาราง
    const oilData = [];
    
    // พยายามแยกข้อมูลจากโครงสร้างตาราง
    const tableRegex = /<table[^>]*>([\s\S]*?)<\/table>/i;
    const tableMatch = html.match(tableRegex);
    
    if (tableMatch) {
        const tableContent = tableMatch[1];
        // แยกแถวของตาราง
        const rowRegex = /<tr[^>]*>([\s\S]*?)<\/tr>/gi;
        let rowMatch;
        let rows = [];
        while ((rowMatch = rowRegex.exec(tableContent)) !== null) {
            rows.push(rowMatch[1]);
        }
        
        // ข้ามหัวตาราง (แถวแรก) แล้วดึงข้อมูล
        for (let i = 1; i < rows.length && i - 1 < oilTypes.length; i++) {
            const cells = rows[i].match(/<td[^>]*>([\s\S]*?)<\/td>/gi);
            if (cells && cells.length >= 3) {
                const typeIndex = i - 1;
                const type = oilTypes[typeIndex] || `น้ำมันชนิดที่ ${typeIndex + 1}`;
                
                // ดึงราคาวันนี้
                const todayMatch = cells[1]?.match(/(\d{2,3}\.\d{2})/);
                const today = todayMatch ? parseFloat(todayMatch[1]) : 0;
                
                // ดึงราคาพรุ่งนี้
                const tomorrowMatch = cells[2]?.match(/(\d{2,3}\.\d{2})/);
                const tomorrow = tomorrowMatch ? parseFloat(tomorrowMatch[1]) : today;
                
                const diff = tomorrow - today;
                
                oilData.push({
                    type: type,
                    today: today,
                    tomorrow: tomorrow,
                    diff: Math.round(diff * 100) / 100,
                    diffText: diff > 0 ? `+${diff.toFixed(2)}` : (diff < 0 ? diff.toFixed(2) : '-')
                });
            }
        }
    }
    
    // ถ้าแยกข้อมูลจากตารางไม่ได้ ให้ใช้ Regex แทน
    if (oilData.length === 0) {
        const priceRegex = /(\d{2,3}\.\d{2})/g;
        const prices = html.match(priceRegex) || [];
        
        if (prices.length >= 8) {
            for (let i = 0; i < Math.min(oilTypes.length, Math.floor(prices.length / 2)); i++) {
                const today = parseFloat(prices[i * 2] || '0');
                const tomorrow = parseFloat(prices[i * 2 + 1] || today);
                const diff = tomorrow - today;
                
                oilData.push({
                    type: oilTypes[i] || `น้ำมันชนิดที่ ${i+1}`,
                    today: today,
                    tomorrow: tomorrow,
                    diff: Math.round(diff * 100) / 100,
                    diffText: diff > 0 ? `+${diff.toFixed(2)}` : (diff < 0 ? diff.toFixed(2) : '-')
                });
            }
        }
    }
    
    // ถ้ายังไม่มีข้อมูล ให้ใช้ข้อมูลตัวอย่าง
    if (oilData.length === 0) {
        const samplePrices = [
            { type: 'ดีเซล B7', price: 32.50 },
            { type: 'แก๊สโซฮอล์ 95', price: 37.50 },
            { type: 'เบนซิน 95', price: 54.25 },
            { type: 'แก๊สโซฮอล์ 91', price: 53.44 },
            { type: 'E85', price: 29.79 },
            { type: 'ดีเซล B20', price: 33.85 },
            { type: 'ดีเซล พรีเมี่ยม', price: 38.48 },
            { type: 'แก๊สโซฮอล์ E20', price: 38.85 }
        ];
        
        samplePrices.forEach(item => {
            oilData.push({
                type: item.type,
                today: item.price,
                tomorrow: item.price,
                diff: 0,
                diffText: '-'
            });
        });
    }
    
    return {
        date: date,
        prices: oilData,
        note: 'ราคาขายปลีก กทม. ที่ยังไม่รวมภาษีบำรุงท้องถิ่น กทม.'
    };
}

// ================================================================
// 4. API Endpoints
// ================================================================

// --- 4.1 ดึงข้อมูลราคาน้ำมันบางจาก (พร้อม Cache) ---
app.get('/api/oil-price', async (req, res) => {
    try {
        // ตรวจสอบ Cache
        const now = Date.now();
        if (oilCache && (now - oilCacheTime) < OIL_CACHE_TTL) {
            return res.json({
                success: true,
                data: oilCache,
                source: 'Cache',
                timestamp: new Date().toISOString()
            });
        }

        const fetch = (await import('node-fetch')).default;
        const oilApiUrl = 'https://oil-price.bangchak.co.th/BcpOilPrice1/th';
        
        const response = await fetch(oilApiUrl, {
            timeout: 10000,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            }
        });
        
        if (!response.ok) {
            throw new Error(`HTTP Error! Status: ${response.status}`);
        }

        const html = await response.text();
        const oilData = parseBangchakOilPrice(html);
        
        // เก็บ Cache
        oilCache = oilData;
        oilCacheTime = now;
        
        res.json({
            success: true,
            data: oilData,
            source: 'Bangchak Oil Price',
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error('Error fetching oil price:', error);
        
        // ถ้ามี Cache เก่าให้ส่งคืน
        if (oilCache) {
            return res.json({
                success: true,
                data: oilCache,
                source: 'Cache (Stale)',
                timestamp: new Date().toISOString(),
                warning: 'Using cached data due to fetch error'
            });
        }
        
        res.status(500).json({
            success: false,
            error: 'Failed to fetch oil price',
            message: error.message
        });
    }
});

// --- 4.2 ดึงข้อมูลราคาน้ำมันแบบ Raw HTML ---
app.get('/api/oil-raw', async (req, res) => {
    try {
        const fetch = (await import('node-fetch')).default;
        const oilApiUrl = 'https://oil-price.bangchak.co.th/BcpOilPrice1/th';
        const response = await fetch(oilApiUrl, {
            timeout: 10000,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            }
        });
        const html = await response.text();
        res.send(html);
    } catch (error) {
        console.error('Error fetching raw oil price:', error);
        res.status(500).json({ 
            error: 'Failed to fetch raw data', 
            message: error.message 
        });
    }
});

// --- 4.3 ดึงข้อมูลผู้ใช้จาก JSONPlaceholder (พร้อม Cache) ---
app.get('/api/users/:id', async (req, res) => {
    try {
        const userId = req.params.id || '1';
        
        if (userCache[userId]) {
            return res.json({
                success: true,
                data: userCache[userId],
                source: 'Cache',
                timestamp: new Date().toISOString()
            });
        }
        
        const fetch = (await import('node-fetch')).default;
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
        
        if (!response.ok) {
            throw new Error(`HTTP Error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        userCache[userId] = data;
        
        res.json({
            success: true,
            data: data,
            source: 'JSONPlaceholder',
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch user data',
            message: error.message
        });
    }
});

// --- 4.4 ดึงข้อมูลผู้ใช้ทั้งหมด ---
app.get('/api/users', async (req, res) => {
    try {
        const fetch = (await import('node-fetch')).default;
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        
        if (!response.ok) {
            throw new Error(`HTTP Error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        res.json({
            success: true,
            data: data,
            source: 'JSONPlaceholder',
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch users data',
            message: error.message
        });
    }
});

// --- 4.5 ดึงข้อมูลโพสต์จาก JSONPlaceholder ---
app.get('/api/posts', async (req, res) => {
    try {
        const limit = Math.min(parseInt(req.query.limit) || 10, 50);
        const fetch = (await import('node-fetch')).default;
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}`);
        
        if (!response.ok) {
            throw new Error(`HTTP Error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        res.json({
            success: true,
            data: data,
            total: data.length,
            source: 'JSONPlaceholder',
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch posts data',
            message: error.message
        });
    }
});

// --- 4.6 ดึงข้อมูลยอดไลค์ของผู้ใช้ ---
app.get('/api/likes/:userId', (req, res) => {
    try {
        const userId = req.params.userId || '1';
        const likeCount = likesDatabase[userId] || 0;
        
        res.json({
            success: true,
            userId: userId,
            likes: likeCount,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error('Error fetching likes:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch likes',
            message: error.message
        });
    }
});

// --- 4.7 อัปเดตยอดไลค์ ---
app.post('/api/likes/:userId', (req, res) => {
    try {
        const userId = req.params.userId || '1';
        const { action } = req.body;
        
        if (!likesDatabase[userId]) {
            likesDatabase[userId] = 0;
        }
        
        if (action === 'like') {
            likesDatabase[userId] += 1;
        } else if (action === 'unlike') {
            likesDatabase[userId] = Math.max(0, likesDatabase[userId] - 1);
        } else {
            return res.status(400).json({
                success: false,
                error: 'Invalid action. Use "like" or "unlike"'
            });
        }
        
        res.json({
            success: true,
            userId: userId,
            likes: likesDatabase[userId],
            action: action,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error('Error updating likes:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to update likes',
            message: error.message
        });
    }
});

// --- 4.8 บันทึกข้อความ ---
app.post('/api/messages', (req, res) => {
    try {
        const { userId, message } = req.body;
        
        if (!message || message.trim() === '') {
            return res.status(400).json({
                success: false,
                error: 'Message is required'
            });
        }
        
        const newMessage = {
            id: messagesDatabase.length + 1,
            userId: userId || '1',
            message: message.trim(),
            timestamp: new Date().toISOString()
        };
        
        messagesDatabase.push(newMessage);
        
        // เก็บข้อความไม่เกิน 100 รายการ
        if (messagesDatabase.length > 100) {
            messagesDatabase.splice(0, messagesDatabase.length - 100);
        }
        
        res.json({
            success: true,
            data: newMessage,
            total: messagesDatabase.length,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error('Error saving message:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to save message',
            message: error.message
        });
    }
});

// --- 4.9 ดึงข้อความทั้งหมด ---
app.get('/api/messages', (req, res) => {
    try {
        const limit = Math.min(parseInt(req.query.limit) || 20, 100);
        const messages = [...messagesDatabase].slice(-limit).reverse();
        
        res.json({
            success: true,
            data: messages,
            total: messagesDatabase.length,
            limit: limit,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch messages',
            message: error.message
        });
    }
});

// --- 4.10 ดึงข้อความตามผู้ใช้ ---
app.get('/api/messages/user/:userId', (req, res) => {
    try {
        const userId = req.params.userId || '1';
        const limit = Math.min(parseInt(req.query.limit) || 10, 50);
        const userMessages = messagesDatabase
            .filter(msg => msg.userId === userId)
            .slice(-limit)
            .reverse();
        
        res.json({
            success: true,
            userId: userId,
            data: userMessages,
            total: userMessages.length,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error('Error fetching user messages:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch user messages',
            message: error.message
        });
    }
});

// --- 4.11 ดึงข้อมูลทั้งหมด ---
app.get('/api/all', async (req, res) => {
    try {
        const fetch = (await import('node-fetch')).default;
        const [userResponse, postsResponse] = await Promise.all([
            fetch('https://jsonplaceholder.typicode.com/users/1'),
            fetch('https://jsonplaceholder.typicode.com/posts?_limit=10')
        ]);

        const user = await userResponse.json();
        const posts = await postsResponse.json();
        
        // ดึงราคาน้ำมันจาก Cache หรือเรียกใหม่
        let oilData = null;
        const now = Date.now();
        if (oilCache && (now - oilCacheTime) < OIL_CACHE_TTL) {
            oilData = oilCache;
        } else {
            try {
                const oilResponse = await fetch('https://oil-price.bangchak.co.th/BcpOilPrice1/th', {
                    timeout: 8000,
                    headers: { 'User-Agent': 'Mozilla/5.0' }
                });
                if (oilResponse.ok) {
                    const oilHtml = await oilResponse.text();
                    oilData = parseBangchakOilPrice(oilHtml);
                    oilCache = oilData;
                    oilCacheTime = now;
                }
            } catch (oilError) {
                console.warn('Oil price fetch failed in /api/all:', oilError.message);
                oilData = oilCache;
            }
        }
        
        const likes = likesDatabase['1'] || 0;
        const recentMessages = [...messagesDatabase].slice(-5).reverse();

        res.json({
            success: true,
            data: {
                user: user,
                posts: posts,
                oilPrice: oilData,
                likes: likes,
                recentMessages: recentMessages
            },
            source: 'JSONPlaceholder + Bangchak + Memory',
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error('Error fetching all data:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch all data',
            message: error.message
        });
    }
});

// ================================================================
// 5. ส่งออก module สำหรับ Vercel และรัน Server
// ================================================================

// ส่งออก app สำหรับ Vercel Serverless
module.exports = app;

// ถ้าไม่ใช่ Vercel (รันตรงๆ) ให้เริ่มต้น Server
if (require.main === module) {
    app.listen(port, () => {
        console.log(`🚀 Server is running on http://localhost:${port}`);
        console.log(`📄 Open index.html at http://localhost:${port}/index.html`);
        console.log(`\n📌 API Endpoints:`);
        console.log(`   GET  /api/oil-price        - ดึงข้อมูลราคาน้ำมันบางจาก (JSON) + Cache 5 นาที`);
        console.log(`   GET  /api/oil-raw          - ดึงข้อมูลราคาน้ำมันบางจาก (HTML)`);
        console.log(`   GET  /api/users/:id        - ดึงข้อมูลผู้ใช้จาก JSONPlaceholder`);
        console.log(`   GET  /api/users            - ดึงข้อมูลผู้ใช้ทั้งหมด`);
        console.log(`   GET  /api/posts            - ดึงข้อมูลโพสต์จาก JSONPlaceholder (ใช้ ?limit=10)`);
        console.log(`   GET  /api/likes/:userId    - ดึงยอดไลค์ของผู้ใช้`);
        console.log(`   POST /api/likes/:userId    - อัปเดตยอดไลค์ (body: { action: 'like'/'unlike' })`);
        console.log(`   POST /api/messages         - บันทึกข้อความ (body: { userId, message })`);
        console.log(`   GET  /api/messages         - ดึงข้อความทั้งหมด`);
        console.log(`   GET  /api/messages/user/:userId - ดึงข้อความตามผู้ใช้`);
        console.log(`   GET  /api/all              - ดึงข้อมูลทั้งหมด (ผู้ใช้ + โพสต์ + ราคาน้ำมัน + ไลค์ + ข้อความ)`);
        console.log(`\n⛽ Bangchak Oil Price API: https://oil-price.bangchak.co.th/BcpOilPrice1/th`);
    });
}
