document.addEventListener('DOMContentLoaded', function () {
    
    // --- 1. API Configuration ---
    const apiKey = '4af0cca21c2dcf38db61496754ec7ebb';

    // --- 2. Location & Weather ---
    // Weather පෙන්වන IDs පේජ් එකේ තිබුණොත් විතරක් මේක වැඩ කරයි
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

            // Element එක තිබේ දැයි පරීක්ෂා කර අගයන් ඇතුළත් කිරීම
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

    // --- 3. JSON Market Data Logic ---
    async function loadMarketPrices() {
        const container = document.getElementById('product-list-container');
        if (!container) return; // පේජ් එකේ නැත්නම් නවත්වන්න

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

    // --- 4. Modal Logic (Global Scope) ---
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

    // --- 5. Charts Configuration (Safe Checks) ---
    
    // Rain Chart
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

    // Tomato & Onion Mini Charts
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

// Navigation toggle (Global Scope)
function toggleMenu() {
    const navLinks = document.getElementById('navLinks');
    if (navLinks) {
        navLinks.classList.toggle('active');
    }
}