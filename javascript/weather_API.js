navigator.geolocation.getCurrentPosition(success, error);

function success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    getCityName(latitude, longitude);
    getWeather(latitude, longitude);
    }

function error() {
    document.getElementById('location').innerHTML = `
        <div class="desc">Gagal mendapatkan lokasi </div>
    `;
    document.getElementById('weather-info').innerHTML = `
    <div class="desc">Gagal mendapatkan cuaca</div>
    `;
    }

function getWeather(lat, lon) {
    const apiKey = '7200f2f058b19eaa3995e1018960957b'; // Ganti dengan API Key milikmu
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=id`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            document.getElementById('weather-info').innerHTML = `
            <div class="weather-item">
                <i class="icon fas fa-${getIcon(data.weather[0].main)}"></i>
                <div class="temp">${data.main.temp}°C </div>
                
            </div>
            <div class="desc">${data.weather[0].description}</div>
            `;
        })
        .catch(err => console.log(err));
    }

    function getCityName(lat, lon) {
        const apiKey = '7200f2f058b19eaa3995e1018960957b'; // API key kamu
        const url = `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${apiKey}`;
    
        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data.length > 0) {
                    // Gunakan fallback jika data.name terlalu lokal
                    const place = data[0];
                    const city = place.name;
                    const state = place.state || "";
                    const country = place.country;
    
                    // Cek apakah 'city' sama dengan 'state' (kadang state dianggap kota)
                    let displayCity = city;
                    if (state && city !== state) {
                        displayCity = `${city}, ${state}`;
                    } else if (!city && state) {
                        displayCity = state;
                    } else if (!city && !state) {
                        displayCity = country;
                    }
    
                    document.getElementById('location').innerHTML = `
                        <div class="temp">Lokasi: anda</div>
                        <div class="desc">${displayCity}</div>
                    `;
                } else {
                    document.getElementById('location').innerHTML = `
                        <div class="desc">Nama kota tidak ditemukan</div>
                    `;
                }
            })
            .catch(err => {
                console.error("Gagal mendapatkan nama kota:", err);
            });
    }
    

  // Fungsi untuk menentukan ikon berdasarkan kondisi
    function getIcon(main) {
        switch(main) {
        case 'Clear': return 'sun';
        case 'Rain': return 'cloud-showers-heavy';
        case 'Clouds': return 'cloud';
        case 'Snow': return 'snowflake';
        case 'Thunderstorm': return 'bolt';
        default: return 'smog';
        }
    }

