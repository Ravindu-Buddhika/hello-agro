// 1. Gemini Configuration (Direct CDN Import)
import { GoogleGenerativeAI } from "https://esm.run/@google/generative-ai";

// --- API KEY SECURITY LOGIC ---
let API_KEY = localStorage.getItem('HELLO_AGRO_KEY');
let genAI, model;

// Key එක Save කරන Function එක (Modal එකේ button එකට සම්බන්ධයි)
window.saveApiKey = function() {
    const key = document.getElementById('keyInput').value.trim();
    if (key) {
        localStorage.setItem('HELLO_AGRO_KEY', key);
        location.reload(); // සයිට් එක Refresh කරලා අලුත් Key එක ගන්න
    } else {
        alert("කරුණාකර වලංගු Key එකක් ඇතුළත් කරන්න.");
    }
};

// AI Initialize කරන Function එක
function initAI(key) {
    try {
        genAI = new GoogleGenerativeAI(key);
        model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });
    } catch (e) {
        console.error("AI Initialization Failed", e);
    }
}
// ------------------------------

// 2. Full Market Data Array
const allProducts = [
    { name: "Beans", market: "dambulla", price: "420/-", weight: "1 Kg", change: "3% ↑" },
    { name: "Carrot", market: "dambulla", price: "380/-", weight: "1 Kg", change: "2% ↓" },
    { name: "Leeks", market: "dambulla", price: "245/-", weight: "1 Kg", change: "1% ↑" },
    { name: "Tomato", market: "dambulla", price: "190/-", weight: "1 Kg", change: "5% ↓" },
    { name: "Potato", market: "dambulla", price: "215/-", weight: "1 Kg", change: "Stable" },
    { name: "Green Chili", market: "dambulla", price: "560/-", weight: "1 Kg", change: "8% ↑" },
    { name: "Brinjal", market: "dambulla", price: "165/-", weight: "1 Kg", change: "4% ↓" },
    { name: "Cabbage", market: "dambulla", price: "235/-", weight: "1 Kg", change: "2% ↑" },
    { name: "Pumpkin", market: "dambulla", price: "115/-", weight: "1 Kg", change: "1% ↓" },
    { name: "Onion", market: "dambulla", price: "325/-", weight: "1 Kg", change: "3% ↑" },
    { name: "Beans", market: "peliyagoda", price: "440/-", weight: "1 Kg", change: "5% ↑" },
    { name: "Carrot", market: "peliyagoda", price: "400/-", weight: "1 Kg", change: "1% ↓" },
    { name: "Leeks", market: "peliyagoda", price: "260/-", weight: "1 Kg", change: "2% ↑" },
    { name: "Tomato", market: "peliyagoda", price: "210/-", weight: "1 Kg", change: "4% ↓" },
    { name: "Potato", market: "peliyagoda", price: "230/-", weight: "1 Kg", change: "2% ↑" },
    { name: "Green Chili", market: "peliyagoda", price: "580/-", weight: "1 Kg", change: "6% ↑" },
    { name: "Brinjal", market: "peliyagoda", price: "180/-", weight: "1 Kg", change: "Stable" },
    { name: "Cabbage", market: "peliyagoda", price: "250/-", weight: "1 Kg", change: "1% ↑" },
    { name: "Pumpkin", market: "peliyagoda", price: "130/-", weight: "1 Kg", change: "3% ↓" },
    { name: "Onion", market: "peliyagoda", price: "340/-", weight: "1 Kg", change: "2% ↑" },
    { name: "Beans", market: "meegoda", price: "415/-", weight: "1 Kg", change: "2% ↓" },
    { name: "Carrot", market: "meegoda", price: "375/-", weight: "1 Kg", change: "Stable" },
    { name: "Leeks", market: "meegoda", price: "240/-", weight: "1 Kg", change: "3% ↑" },
    { name: "Tomato", market: "meegoda", price: "175/-", weight: "1 Kg", change: "6% ↓" },
    { name: "Potato", market: "meegoda", price: "210/-", weight: "1 Kg", change: "1% ↑" },
    { name: "Green Chili", market: "meegoda", price: "540/-", weight: "1 Kg", change: "4% ↑" },
    { name: "Brinjal", market: "meegoda", price: "155/-", weight: "1 Kg", change: "2% ↓" },
    { name: "Cabbage", market: "meegoda", price: "225/-", weight: "1 Kg", change: "Stable" },
    { name: "Pumpkin", market: "meegoda", price: "110/-", weight: "1 Kg", change: "5% ↓" },
    { name: "Onion", market: "meegoda", price: "315/-", weight: "1 Kg", change: "1% ↑" },
    { name: "Beans", market: "narahenpita", price: "450/-", weight: "1 Kg", change: "7% ↑" },
    { name: "Carrot", market: "narahenpita", price: "410/-", weight: "1 Kg", change: "3% ↑" },
    { name: "Leeks", market: "narahenpita", price: "270/-", weight: "1 Kg", change: "4% ↑" },
    { name: "Tomato", market: "narahenpita", price: "220/-", weight: "1 Kg", change: "2% ↓" },
    { name: "Potato", market: "narahenpita", price: "240/-", weight: "1 Kg", change: "5% ↑" },
    { name: "Green Chili", market: "narahenpita", price: "600/-", weight: "1 Kg", change: "10% ↑" },
    { name: "Brinjal", market: "narahenpita", price: "190/-", weight: "1 Kg", change: "3% ↑" },
    { name: "Cabbage", market: "narahenpita", price: "260/-", weight: "1 Kg", change: "2% ↑" },
    { name: "Pumpkin", market: "narahenpita", price: "140/-", weight: "1 Kg", change: "1% ↑" },
    { name: "Onion", market: "narahenpita", price: "350/-", weight: "1 Kg", change: "4% ↑" },
    { name: "Beans", market: "keppetipola", price: "400/-", weight: "1 Kg", change: "Stable" },
    { name: "Carrot", market: "keppetipola", price: "360/-", weight: "1 Kg", change: "5% ↓" },
    { name: "Leeks", market: "keppetipola", price: "230/-", weight: "1 Kg", change: "2% ↓" },
    { name: "Tomato", market: "keppetipola", price: "160/-", weight: "1 Kg", change: "8% ↓" },
    { name: "Potato", market: "keppetipola", price: "200/-", weight: "1 Kg", change: "1% ↓" },
    { name: "Green Chili", market: "keppetipola", price: "520/-", weight: "1 Kg", change: "Stable" },
    { name: "Brinjal", market: "keppetipola", price: "150/-", weight: "1 Kg", change: "5% ↓" },
    { name: "Cabbage", market: "keppetipola", price: "215/-", weight: "1 Kg", change: "3% ↓" },
    { name: "Pumpkin", market: "keppetipola", price: "105/-", weight: "1 Kg", change: "2% ↓" },
    { name: "Onion", market: "keppetipola", price: "310/-", weight: "1 Kg", change: "Stable" },
    { name: "Beans", market: "veyangoda", price: "425/-", weight: "1 Kg", change: "1% ↑" },
    { name: "Carrot", market: "veyangoda", price: "385/-", weight: "1 Kg", change: "2% ↑" },
    { name: "Leeks", market: "veyangoda", price: "255/-", weight: "1 Kg", change: "Stable" },
    { name: "Tomato", market: "veyangoda", price: "185/-", weight: "1 Kg", change: "3% ↓" },
    { name: "Potato", market: "veyangoda", price: "220/-", weight: "1 Kg", change: "2% ↑" },
    { name: "Green Chili", market: "veyangoda", price: "570/-", weight: "1 Kg", change: "5% ↑" },
    { name: "Brinjal", market: "veyangoda", price: "170/-", weight: "1 Kg", change: "1% ↑" },
    { name: "Cabbage", market: "veyangoda", price: "245/-", weight: "1 Kg", change: "Stable" },
    { name: "Pumpkin", market: "veyangoda", price: "120/-", weight: "1 Kg", change: "2% ↓" },
    { name: "Onion", market: "veyangoda", price: "330/-", weight: "1 Kg", change: "3% ↑" },
    { name: "Beans", market: "thambuththegama", price: "410/-", weight: "1 Kg", change: "3% ↓" },
    { name: "Carrot", market: "thambuththegama", price: "370/-", weight: "1 Kg", change: "Stable" },
    { name: "Leeks", market: "thambuththegama", price: "235/-", weight: "1 Kg", change: "2% ↑" },
    { name: "Tomato", market: "thambuththegama", price: "165/-", weight: "1 Kg", change: "10% ↓" },
    { name: "Potato", market: "thambuththegama", price: "205/-", weight: "1 Kg", change: "Stable" },
    { name: "Green Chili", market: "thambuththegama", price: "530/-", weight: "1 Kg", change: "4% ↑" },
    { name: "Brinjal", market: "thambuththegama", price: "150/-", weight: "1 Kg", change: "6% ↓" },
    { name: "Cabbage", market: "thambuththegama", price: "220/-", weight: "1 Kg", change: "1% ↑" },
    { name: "Pumpkin", market: "thambuththegama", price: "100/-", weight: "1 Kg", change: "5% ↓" },
    { name: "Onion", market: "thambuththegama", price: "315/-", weight: "1 Kg", change: "2% ↑" }
];

// 3. Central Router & Initializer
document.addEventListener('DOMContentLoaded', () => {
    // Shared UI Logic (Navbar)
    initNavbar();

    // --- API Key Modal Logic ---
    if (!API_KEY) {
        const modal = document.getElementById('apiKeyModal');
        if (modal) modal.style.display = 'block';
    } else {
        initAI(API_KEY);
    }

    // Check current page filename
    const path = window.location.pathname;
    const page = path.split("/").pop();

    // Route-specific initialization
    if (page === "market.html") {
        displayProducts(allProducts);
    } else if (page === "chat.html") {
        initChat();
    } else if (page === "climate.html" || page === "index.html" || page === "") {
        initWeather();
    } else if (page === "camera.html") {
        initCamera();
    }
});

// --- NAVBAR LOGIC ---
function initNavbar() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }
}

// --- MARKET LOGIC ---
window.displayProducts = function(data) {
    const grid = document.getElementById('productGrid');
    if (!grid) return; 
    grid.innerHTML = data.length === 0 ? `<p style="color: white; grid-column: 1/-1; text-align: center;">No products found.</p>` : "";
    data.forEach(item => {
        grid.innerHTML += `
            <div class="market-card">
                <div class="card-left">
                    <h2 class="item-name">${item.name}</h2>
                    <p class="item-meta">${item.weight} &nbsp; ${item.change}</p>
                    <span class="market-label">${item.market}</span>
                </div>
                <div class="card-right"><h1 class="item-price">${item.price}</h1></div>
            </div>`;
    });
};

window.filterProducts = function() {
    const marketVal = document.getElementById('marketDropdown')?.value.toLowerCase();
    const searchVal = document.getElementById('searchInput')?.value.toLowerCase();
    const filtered = allProducts.filter(p => (marketVal === "all" || p.market.toLowerCase() === marketVal) && p.name.toLowerCase().includes(searchVal));
    displayProducts(filtered);
};

// --- PREDICTION LOGIC ---
window.generatePrediction = async function() {
    if (!model) return alert("කරුණාකර API Key එක ඇතුළත් කර Save කරන්න.");
    const productInput = document.getElementById('productSearch');
    if (!productInput || !productInput.value) return alert("කරුණාකර බෝගයක නමක් ඇතුළත් කරන්න.");
    
    const btn = document.querySelector('.search-section button');
    const productName = productInput.value;
    btn.innerText = "⌛";

    const prompt = `As a Sri Lankan agricultural expert, predict future prices for "${productName}". 
    Return ONLY a raw JSON object like this: 
    {"today": 420, "nextWeek": 435, "nextMonth": 450, "monthlyTrend": [400, 410, 420, 430, 440, 450, 460, 470, 480, 490, 500, 510]}`;

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const responseText = response.text();
        
        const cleanJson = responseText.replace(/```json|```/g, "").trim();
        const data = JSON.parse(cleanJson);

        document.getElementById('todayPrice').innerText = `${data.today}/-`;
        document.getElementById('weekPrice').innerText = `${data.nextWeek}/-`;
        document.getElementById('monthPrice').innerText = `${data.nextMonth}/-`;
        
        if (typeof window.initChart === "function") {
            window.initChart(data.monthlyTrend);
        }
    } catch (e) { 
        console.error("Prediction Error:", e);
        alert("දෝෂයක් සිදු වුණා. කරුණාකර නැවත උත්සාහ කරන්න.");
    } finally { 
        btn.innerText = "Search"; 
    }
};

// --- CHAT LOGIC ---
function initChat() {
    const chatInput = document.getElementById('chatInput');
    const sendBtn = document.querySelector('.send-btn');
    if (sendBtn) {
        sendBtn.addEventListener('click', sendMessage);
        chatInput?.addEventListener('keypress', (e) => { if (e.key === 'Enter') sendMessage(); });
    }
}

async function sendMessage() {
    if (!model) return alert("කරුණාකර API Key එක ඇතුළත් කර Save කරන්න.");
    const inputField = document.getElementById('chatInput');
    const message = inputField.value.trim();

    if (!message) return;

    appendMessage('user', message);
    inputField.value = '';

    try {
        const result = await model.generateContent(message);
        const response = await result.response;
        const aiText = response.text(); 

        appendMessage('ai', aiText);

    } catch (error) {
        console.error("❌ Gemini Error:", error);
        appendMessage('ai', "සමාවෙන්න, මට පිළිතුර ලබා ගැනීමට නොහැකි වුණා. කරුණාකර නැවත උත්සාහ කරන්න.");
    }
}

function appendMessage(sender, text) {
    const chatWindow = document.getElementById('chatWindow');
    if (!chatWindow) return;
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('message', sender === 'user' ? 'user-msg' : 'ai-msg');
    msgDiv.innerHTML = sender === 'ai' ? marked.parse(text) : text;
    chatWindow.appendChild(msgDiv);
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

// --- WEATHER LOGIC ---
const WEATHER_API_KEY = "4af0cca21c2dcf38db61496754ec7ebb";
function initWeather() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (pos) => {
            try {
                const [curr, fore] = await Promise.all([
                    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&appid=${WEATHER_API_KEY}&units=metric`).then(r => r.json()),
                    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&appid=${WEATHER_API_KEY}&units=metric`).then(r => r.json())
                ]);
                updateWeatherUI(curr, fore);
            } catch (e) { console.error("Weather failed", e); }
        }, e => console.warn("Location blocked"));
    }
}

function updateWeatherUI(current, forecast) {
    const tempEl = document.querySelector('.temp-value h1');
    if (!tempEl) return;
    tempEl.innerHTML = `${Math.round(current.main.temp)}<span>°</span>`;
    document.querySelector('.temp-value p').innerText = current.weather[0].description;
    const stats = document.querySelectorAll('.stat-item span');
    if (stats.length >= 4) {
        stats[0].innerText = `Humidity Level : ${current.main.humidity}%`;
        stats[1].innerText = `Last hour rain : ${current.rain?.['1h'] || 0}mm`;
        stats[2].innerText = `Wind Speed : ${current.wind.speed}`;
        stats[3].innerText = `Pressure : ${current.main.pressure} hPa`;
    }
}

// --- CAMERA LOGIC ---
function initCamera() {
    const video = document.getElementById('webcam');
    const scanBtn = document.getElementById('scanBtn');
    if (!video || !scanBtn) return;

    navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } })
        .then(stream => { video.srcObject = stream; })
        .catch(e => console.error("Camera access denied"));

    scanBtn.addEventListener('click', async () => {
        if (!model) return alert("කරුණාකර API Key එක ඇතුළත් කර Save කරන්න.");
        scanBtn.innerText = "ANALYZING...";
        scanBtn.disabled = true;
        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = video.videoWidth; canvas.height = video.videoHeight;
        ctx.drawImage(video, 0, 0);
        const imageData = canvas.toDataURL('image/jpeg', 0.8).split(',')[1];

        try {
            const result = await model.generateContent([
                "Identify if this plant has diseases or if this pest is harmful. Provide remedies.",
                { inlineData: { data: imageData, mimeType: "image/jpeg" } }
            ]);
            document.getElementById('analysisOutput').innerHTML = marked.parse(result.response.text());
            document.getElementById('resultModal').style.display = "block";
        } catch (e) { alert("Scan failed"); }
        finally { scanBtn.innerText = "SCAN NOW"; scanBtn.disabled = false; }
    });

    document.querySelector('.close-modal')?.addEventListener('click', () => {
        document.getElementById('resultModal').style.display = "none";
    });
}