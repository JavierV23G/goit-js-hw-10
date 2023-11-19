import axios from "axios";
import { fetchCatByBreed } from "./cat-api";

axios.defaults.headers.common["x-api-key"] = "live_SIFTvSVX5Hqh6v9SUd9xSKCQz6ArdrcxidgwATNB79K7LkHNMPbHMK5TISKIpGg2";

const catSelector = document.getElementById('breed-select');

document.addEventListener('DOMContentLoaded', fetchBreeds);

function fetchBreeds() {
    axios.get('https://api.thecatapi.com/v1/breeds')
        .then(response => {
            const data = response.data;
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
};

catSelector.addEventListener('change', () => {
    const selectedBreedId = catSelector.value;
    fetchCatByBreed(selectedBreedId);
});













