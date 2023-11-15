import axios from "axios";
axios.defaults.headers.common["x-api-key"] = "live_SIFTvSVX5Hqh6v9SUd9xSKCQz6ArdrcxidgwATNB79K7LkHNMPbHMK5TISKIpGg2";

import { fetchCatByBreed } from './cat-api.js';

const catSelector = document.getElementById('breed-select');
const catInfo = document.querySelector('.cat-info');

document.addEventListener('DOMContentLoaded', fetchBreeds);
    function fetchBreeds() { 
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
    };

catSelector.addEventListener('change', () => {
    const selectedBreedId = catSelector.value;

    fetchCatByBreed(selectedBreedId)
    .then(catData => {
        if (catData && catData.length > 0 && catData[0].breeds && catData[0].breeds.length > 0) {
            const catImage = catData[0].url;
            const catBreed = catData[0].breeds[0];

            catInfo.innerHTML = `
                <img src="${catImage}" alt="Cat Image">
                <h2>${catBreed.name}</h2>
                <p><strong>Description:</strong> ${catBreed.description}</p>
                <p><strong>Temperament:</strong> ${catBreed.temperament}</p>
            `;
        } else {
            catInfo.innerHTML = '<p>No cat data available</p>';
        }
    })
    .catch(error => {
        console.error('Error displaying cat data:', error);
        catInfo.innerHTML = '<p>Oops! Something went wrong while fetching cat data.</p>';
    });
})











