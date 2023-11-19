import axios from "axios";
axios.defaults.headers.common["x-api-key"] = "live_SIFTvSVX5Hqh6v9SUd9xSKCQz6ArdrcxidgwATNB79K7LkHNMPbHMK5TISKIpGg2";

export function fetchCatByBreed(selectedBreedId) {
    const catInfo = document.querySelector('.cat-info'); 
    
    axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${selectedBreedId}`)
        .then(response => {
            const catData = response.data;
            if (catData && catData.length > 0 && catData[0].breeds && catData[0].breeds.length > 0) {
                const catImage = catData[0].url;
                const catBreed = catData[0].breeds[0];

                catInfo.innerHTML = `
                    <img src="${catImage}" alt="Cat Image">
                    <h2>${catBreed.name}</h2>
                    <p><strong>Description:</strong> ${catBreed.description}</p>
                    <p><strong>Temperament:</strong> ${catBreed.temperament}</p>
                `;
                
                const imageElement = catInfo.querySelector('img');
                imageElement.classList.add('catPicture');
                
            } else {
                catInfo.innerHTML = '<p>No cat data available</p>';
            }
        })
        .catch(error => {
            console.error('Error fetching cat data:', error);
            catInfo.innerHTML = '<p>Oops! Something went wrong while fetching cat data.</p>';
        });
}