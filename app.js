document.addEventListener('DOMContentLoaded', function () {
    const weatherForm = document.getElementById('weather-form');
    const weatherInfo = document.getElementById('weather-info');
    const mapDiv = document.getElementById('map');
    let map;

    weatherForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const cityInput = document.getElementById('city');
        const city = cityInput.value.trim();

        if (city !== '') {
            getWeather(city);
        } else {
            alert('Please enter a city.');
        }
    });

    function getWeather(city) {
        const apiKey = 'f8439989deaa404394c140915240302'; // Replace with your actual API key
        const apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=3`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                displayWeather(data);
                displayMap(data.location.lat, data.location.lon);
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
            });
    }

    function displayWeather(data) {
        const weatherInfoText = `Current temperature in ${data.location.name}: ${data.current.temp_c}°C`;

        // Display 3-day forecast
        const forecastText = `
            <h2>3-Day Forecast</h2>
            <ul>
                <li>${data.forecast.forecastday[0].date}: ${data.forecast.forecastday[0].day.maxtemp_c}°C</li>
                <li>${data.forecast.forecastday[1].date}: ${data.forecast.forecastday[1].day.maxtemp_c}°C</li>
                <li>${data.forecast.forecastday[2].date}: ${data.forecast.forecastday[2].day.maxtemp_c}°C</li>
            </ul>
        `;

        weatherInfo.innerHTML = weatherInfoText + forecastText;
    }

    function displayMap(lat, lon) {
        if (!map) {
            map = L.map('map').setView([lat, lon], 10);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; OpenStreetMap contributors'
            }).addTo(map);

            L.marker([lat, lon]).addTo(map)
                .bindPopup('Your location')
                .openPopup();
        } else {
            map.setView([lat, lon], 10);
            L.marker([lat, lon]).addTo(map)
                .bindPopup('Your location')
                .openPopup();
        }
    }
});
