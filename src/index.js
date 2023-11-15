import axios from "axios";
axios.defaults.headers.common["x-api-key"] = "live_SIFTvSVX5Hqh6v9SUd9xSKCQz6ArdrcxidgwATNB79K7LkHNMPbHMK5TISKIpGg2";

document.addEventListener('DOMContentLoaded', () => {
    const catSelector = document.getElementById('breed-select');

    fetch('https://api.thecatapi.com/v1/breeds')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            data.forEach(raza => {
                const option = document.createElement('option');
                option.value = raza.id;
                option.textContent = raza.name; 
                catSelector.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            const errorElement = document.querySelector('.error');
            errorElement.style.display = 'block';
        });
});

