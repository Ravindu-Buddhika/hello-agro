// 1. Gemini Configuration (Direct CDN Import)
import { GoogleGenerativeAI } from "https://esm.run/@google/generative-ai";

const API_KEY = "AIzaSyCbJe2PsgO_gdzxNnfqB5K_abp5JcvGhZs";
const genAI = new GoogleGenerativeAI(API_KEY);

// async function checkAvailableModels() {
//     const apiKey = "AIzaSyCbJe2PsgO_gdzxNnfqB5K_abp5JcvGhZs";
//     const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;
    
//     try {
//         const response = await fetch(url);
//         const data = await response.json();
//         console.log("ඔයාගේ Key එකට වැඩ කරන Models:", data.models.map(m => m.name));
//     } catch (e) {
//         console.error("Models ලැයිස්තුව ලබා ගත නොහැක:", e);
//     }
// }
// checkAvailableModels();

// Mobile Menu එක වැඩ කිරීමට අවශ්‍ය Logic එක
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        // Toggle Button එක click කරන විට active class එක මාරු කිරීම
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });

        // මෙනු එකේ තියෙන link එකක් click කළාම මෙනු එක වහන්න
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('active');
            });
        });
    }
});

// 2. Full Data Array
const allProducts = [
    // --- DAMBULLA ---
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

    // --- PELIYAGODA ---
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

    // --- MEEGODA ---
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

    // --- NARAHENPITA ---
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

    // --- KEPPETIPOLA ---
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

    // --- VEYANGODA ---
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

    // --- THAMBUTHTHEGAMA ---
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

// 3. Market Page Display Logic
window.displayProducts = function(data) {
    const grid = document.getElementById('productGrid');
    if (!grid) return; 

    grid.innerHTML = "";
    if (data.length === 0) {
        grid.innerHTML = `<p style="color: white; grid-column: 1/-1; text-align: center;">No products found.</p>`;
        return;
    }

    data.forEach(item => {
        grid.innerHTML += `
            <div class="market-card">
                <div class="card-left">
                    <h2 class="item-name">${item.name}</h2>
                    <p class="item-meta">${item.weight} &nbsp; ${item.change}</p>
                    <span class="market-label">${item.market}</span>
                </div>
                <div class="card-right">
                    <h1 class="item-price">${item.price}</h1>
                </div>
            </div>`;
    });
};

// 4. Filtering Logic
window.filterProducts = function() {
    const marketDropdown = document.getElementById('marketDropdown');
    const searchInput = document.getElementById('searchInput');
    
    if(!marketDropdown || !searchInput) return;

    const marketVal = marketDropdown.value.toLowerCase();
    const searchVal = searchInput.value.toLowerCase();

    const filtered = allProducts.filter(p => {
        const matchesMarket = (marketVal === "all" || p.market.toLowerCase() === marketVal);
        const matchesSearch = p.name.toLowerCase().includes(searchVal);
        return matchesMarket && matchesSearch;
    });

    displayProducts(filtered);
};

// 5. Prediction Logic
window.generatePrediction = async function() {
    const productInput = document.getElementById('productSearch');
    if (!productInput || !productInput.value) return alert("කරුණාකර බෝගයක නමක් ඇතුළත් කරන්න.");

    const productName = productInput.value;
    const btn = document.querySelector('.search-section button');
    const apiKey = "AIzaSyCbJe2PsgO_gdzxNnfqB5K_abp5JcvGhZs"; 
    
    btn.innerText = "⌛";

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${apiKey}`;

    const prompt = `Context: You are a Sri Lankan agricultural market expert. 
    Current Market Data: ${JSON.stringify(allProducts)}
    
    Task: Predict future prices for "${productName}" in the Sri Lankan market.
    
    Consider these seasonal factors in your prediction:
    1. Seasonal Demand: Prices usually spike during April (Sinhala/Tamil New Year) and December (Christmas/New Year).
    2. Weather Patterns: Heavy rain (Maha/Yala seasons) can damage crops and increase prices, while harvest seasons (aswanna kapana kala) significantly drop prices.
    3. Current Trend: Use the "change" percentage in the provided data as the starting point.

    Return ONLY a raw JSON object with no markdown tags. 
    Format: {
        "today": 420, 
        "nextWeek": 435, 
        "nextMonth": 450, 
        "monthlyTrend": [400, 410, 420, 430, 440, 450, 460, 470, 480, 490, 500, 510]
    }
    Note: Ensure the monthlyTrend array represents a realistic 12-month fluctuation based on Sri Lankan seasonality.`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }]
            })
        });

        const result = await response.json();
        
        console.log("Full Gemini Result:", result);

        if (!response.ok) {
            throw new Error(result.error ? result.error.message : "API Call Failed");
        }

        const responseText = result.candidates[0].content.parts[0].text;
        
        console.log("Raw Response Text:", responseText);
        
        const cleanJson = responseText.replace(/```json|```/g, "").trim();
        const data = JSON.parse(cleanJson);

        console.log("Parsed Data Object:", data);

        document.getElementById('todayPrice').innerText = `${data.today}/-`;
        document.getElementById('weekPrice').innerText = `${data.nextWeek}/-`;
        document.getElementById('monthPrice').innerText = `${data.nextMonth}/-`;
        
        if (typeof window.initChart === "function") {
            window.initChart(data.monthlyTrend);
        }

    } catch (e) { 
        console.error("Prediction Error:", e);
        alert("Errior: " + e.message);
    } finally { 
        btn.innerText = "Search"; 
    }
};

// 6. Initial Load
window.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('productGrid')) {
        displayProducts(allProducts);
    }
});

let myChart = null;

window.initChart = function(monthlyTrend) {
    const ctx = document.getElementById('priceChart').getContext('2d');
    

    if (myChart) {
        myChart.destroy();
    }


    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, 'rgba(30, 93, 3, 0.5)');
    gradient.addColorStop(1, 'rgba(30, 93, 3, 0)');

    const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Price Trend (Rs.)',
                data: monthlyTrend,
                borderColor: '#1e5d03',
                backgroundColor: gradient,
                borderWidth: 3,
                fill: true,
                tension: 0.4, 
                pointRadius: 4,
                pointBackgroundColor: '#1e5d03'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false 
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    grid: { color: 'rgba(255, 255, 255, 0.1)' },
                    ticks: { color: '#888' }
                },
                x: {
                    grid: { display: false },
                    ticks: { color: '#888' }
                }
            }
        }
    });
};