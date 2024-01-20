const URLBASE = 'https://api.openweathermap.org/data/2.5/weather?';
        const APIKEY = '81d92e32020218628bc24f5d86ae3375';

        async function request(url) {
            return fetch(url).then(data => data.json());
        }

        async function getWeather(lat, lon) {
            const url = `${URLBASE}lat=${lat}&lon=${lon}&appid=${APIKEY}`;
            const weather = await request(url);
            updateDOM(weather.name, weather.main.temp);
        }

        async function getWeatherByCity(city) {
            const url = `${URLBASE}q=${city}&appid=${APIKEY}`;
            const weather = await request(url);
            updateDOM(weather.name, weather.main.temp);
        }

        function updateDOM(city, temp) {
            document.querySelector("#city").textContent = city;
            let celsius = (temp - 273.15).toFixed(2);
            document.querySelector("#temperature").textContent = `${celsius}°C`;

            if (celsius > 25) {
                document.body.style.backgroundColor = "red";
            } else if (celsius > 20) {
                document.body.style.backgroundColor = "yellow";
            } else if (celsius > 15) {
                document.body.style.backgroundColor = "orange";
            } else {
                document.body.style.backgroundColor = "blue";
            }
        }

        document.getElementById("searchForm").addEventListener("submit", function (event) {
            event.preventDefault();
            const countryInput = document.getElementById("countryInput").value;
            getWeatherByCity(countryInput);
        });

        navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            getWeather(lat, lon);
        });