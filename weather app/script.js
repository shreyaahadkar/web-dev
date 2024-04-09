// Function to fetch weather data for a given city
async function fetchWeather(city) {
    const url = `https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=${city}`;
    const options = {
        method: "GET",
        headers: {
            "X-RapidAPI-Key": "f29afa5977msh2f3afc5f5a86303p1889a6jsnb485494f341d",
            "X-RapidAPI-Host": "weather-by-api-ninjas.p.rapidapi.com",
        },
    };

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error('Failed to fetch weather data');
        }
        const data = await response.json(); // Parse JSON response
        updateWeatherUI(city, data); // Update UI with weather data
    } catch (error) {
        console.error(error);
        // Update UI to show error message
        document.getElementById('cityname').innerHTML = "Error: Unable to fetch weather data";
    }
}

// Function to update the UI with weather information for a specific city
function updateWeatherUI(city, data) {
    document.getElementById('cityname').innerHTML = city;
    // Access weather data from parsed response and update UI
    document.getElementById('cloud_pct').innerHTML = data.cloud_pct;
    document.getElementById('temp').innerHTML = data.temp;
	document.getElementById('temp2').innerHTML = data.temp;
    document.getElementById('feels_like').innerHTML = data.feels_like;
    document.getElementById('humidity').innerHTML = data.humidity;
	document.getElementById('humidity2').innerHTML = data.humidity;
    document.getElementById('min_temp').innerHTML = data.min_temp;
    document.getElementById('max_temp').innerHTML = data.max_temp;
    document.getElementById('wind_speed').innerHTML = data.wind_speed;
	document.getElementById('wind_speed2').innerHTML = data.wind_speed;
    document.getElementById('wind_degrees').innerHTML = data.wind_degrees;
    document.getElementById('sunrise').innerHTML = data.sunrise;
}

// Function to fetch weather data for other cities and populate the table
async function fetchWeatherForOtherCities() {
    const cities = ['Shanghai', 'Boston', 'Lucknow', 'Kolkata'];
    const tableBody = document.querySelector('.table tbody');

    for (const city of cities) {
        const url = `https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=${city}`;
        const options = {
            method: "GET",
            headers: {
                "X-RapidAPI-Key": "f29afa5977msh2f3afc5f5a86303p1889a6jsnb485494f341d",
                "X-RapidAPI-Host": "weather-by-api-ninjas.p.rapidapi.com",
            },
        };

        try {
            const response = await fetch(url, options);
            const data = await response.json(); // Parse JSON response
            const row = document.createElement('tr');
            row.innerHTML = `
                <th scope="row" class="text-start">${city}</th>
                <td>${data.cloud_pct}</td>
                <td>${data.feels_like}</td>
                <td>${data.humidity}</td>
                <td>${data.max_temp}</td>
                <td>${data.min_temp}</td>
                <td>${data.sunrise}</td>
                <td>${data.sunset}</td>
                <td>${data.temp}</td>
                <td>${data.wind_degrees}</td>
                <td>${data.wind_speed}</td>
            `;
            tableBody.appendChild(row);
        } catch (error) {
            console.error(`Failed to fetch weather data for ${city}`, error);
            // You can handle errors here if needed
        }
    }
}

// Get the submit button element
const submitButton = document.getElementById('submit');

// Add click event listener to submit button
submitButton.addEventListener("click", (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    const city = document.getElementById('city').value.trim(); // Get the city value from the input field and trim any extra whitespace
    if (city) { // Ensure city value is not empty
        fetchWeather(city); // Call fetchWeather function with the city value
    } else {
        // Handle empty city input
        console.error("City name is required");
    }
});

// Fetch weather for Mumbai by default when the page loads
window.addEventListener('load', () => {
    fetchWeather("Mumbai");
    fetchWeatherForOtherCities(); // Call to fetch weather for other cities
});
