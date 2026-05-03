document.addEventListener('DOMContentLoaded', function () {

    const apiKey = '4af0cca21c2dcf38db61496754ec7ebb';

    if (document.getElementById('city-name')) {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                fetchWeather(position.coords.latitude, position.coords.longitude);
            }, error => {
                fetchWeather(6.9271, 79.8612); // Default Colombo
            });
        }
    }

    async function fetchWeather(lat, lon) {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`);
            const data = await response.json();


            const cityEl = document.getElementById('city-name');
            const tempEl = document.querySelector('.temp-text');
            const descEl = document.getElementById('weather-desc');

            if (cityEl) cityEl.innerText = `📍 ${data.name}, ${data.sys.country}`;
            if (tempEl) tempEl.innerText = `${Math.round(data.main.temp)}°C`;
            if (descEl) descEl.innerText = data.weather[0].description;
            
            if (document.getElementById('rainProbabilityChart')) {
                updateRainChart(data.clouds.all);
            }
        } catch (error) {
            console.error("Weather Error:", error);
        }
    }


    async function loadMarketPrices() {
        const container = document.getElementById('product-list-container');
        if (!container) return; 

        try {
            const response = await fetch('products.json');
            const data = await response.json();
            container.innerHTML = ''; 

            data.products.forEach(item => {
                let trendColor = item.trend === 'up' ? 'text-red-500' : (item.trend === 'down' ? 'text-emerald-500' : 'text-gray-400');
                let trendIcon = item.trend === 'up' ? '↑' : (item.trend === 'down' ? '↓' : '•');

                container.innerHTML += `
                    <div class="p-4 border rounded-3xl flex justify-between items-center bg-white shadow-sm">
                        <div>
                            <h4 class="font-bold text-gray-700">${item.name}</h4>
                            <p class="text-lg font-black text-[#0d9488]">රු. ${item.price}</p>
                            <p class="text-[10px] text-gray-400 font-bold uppercase">${item.unit}</p>
                        </div>
                        <div class="text-right">
                            <span class="text-xs font-black ${trendColor}">${trendIcon} ${item.change}</span>
                        </div>
                    </div>`;
            });
        } catch (error) {
            console.error("Market Data Error:", error);
        }
    }


    window.openModal = function(id) {
        const modal = document.getElementById(id);
        if (modal) {
            modal.classList.remove('hidden');
            modal.classList.add('flex');
            if (id === 'market-modal') loadMarketPrices();
        }
    };

    window.closeModal = function(id) {
        const modal = document.getElementById(id);
        if (modal) {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
        }
    };


    

    function updateRainChart(chance) {
        const ctx = document.getElementById('rainProbabilityChart');
        if (!ctx) return;
        
        if (window.rainChart) window.rainChart.destroy();
        window.rainChart = new Chart(ctx.getContext('2d'), {
            type: 'doughnut',
            data: { datasets: [{ data: [chance, 100 - chance], backgroundColor: ['#0d9488', '#e2eee2'], borderWidth: 0 }] },
            options: { cutout: '80%', plugins: { legend: { display: false } } }
        });
        const valEl = document.querySelector('.chart-val');
        if (valEl) valEl.innerText = `${chance}%`;
    }

    const tomatoCtx = document.getElementById('tomatoPriceChart');
    if (tomatoCtx) {
        new Chart(tomatoCtx.getContext('2d'), {
            type: 'line',
            data: { labels: ['','','','',''], datasets: [{ data: [210, 225, 220, 235, 240], borderColor: '#ef4444', borderWidth: 2, fill: false, tension: 0.4 }] },
            options: { maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { x: { display: false }, y: { display: false } } }
        });
    }

    const onionCtx = document.getElementById('onionPriceChart');
    if (onionCtx) {
        new Chart(onionCtx.getContext('2d'), {
            type: 'line',
            data: { labels: ['','','','',''], datasets: [{ data: [200, 195, 190, 185, 180], borderColor: '#10b981', borderWidth: 2, fill: false, tension: 0.4 }] },
            options: { maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { x: { display: false }, y: { display: false } } }
        });
    }

    const mainChartCtx = document.getElementById('marketPredictionChart');
    if (mainChartCtx) {
        new Chart(mainChartCtx.getContext('2d'), {
            type: 'line',
            data: {
                labels: ['අද', 'හෙට', 'අනිද්දා', 'සිකුරාදා', 'සෙනසුරාදා'],
                datasets: [{ label: 'Price', data: [240, 255, 270, 260, 285], borderColor: '#0d9488', backgroundColor: 'rgba(13, 148, 136, 0.1)', fill: true, tension: 0.4 }]
            },
            options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }
        });
    }
});


function toggleMenu() {
    const navLinks = document.getElementById('navLinks');
    if (navLinks) {
        navLinks.classList.toggle('active');
    }
}


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


function displayProducts(data) {
    const grid = document.getElementById('productGrid');
    grid.innerHTML = "";

    if (data.length === 0) {
        grid.innerHTML = `<p style="color: white; grid-column: 1/-1; text-align: center;">No products found.</p>`;
        return;
    }

    data.forEach(item => {
        const card = `
            <div class="market-card">
                <div class="card-left">
                    <h2 class="item-name">${item.name}</h2>
                    <p class="item-meta">${item.weight} &nbsp; ${item.change}</p>
                    <span class="market-label">${item.market}</span>
                </div>
                <div class="card-right">
                    <h1 class="item-price">${item.price}</h1>
                </div>
            </div>
        `;
        grid.innerHTML += card;
    });
}


function filterProducts() {
    const marketVal = document.getElementById('marketDropdown').value;
    const searchVal = document.getElementById('searchInput').value.toLowerCase();

    const filtered = allProducts.filter(p => {
       
        const matchesMarket = (marketVal === "all" || p.market.toLowerCase() === marketVal.toLowerCase());

        const matchesSearch = p.name.toLowerCase().includes(searchVal);
        
        return matchesMarket && matchesSearch;
    });

    displayProducts(filtered);
}


window.onload = () => {
    displayProducts(allProducts);
};


function toggleMenu() {
    document.getElementById('navLinks').classList.toggle('active');
    document.querySelector('.mobile-menu-toggle').classList.toggle('active');
}