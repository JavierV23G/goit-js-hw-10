import axios from 'axios';

const catInfo = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');

loader.style.display = 'none';

export function fetchCatByBreed(selectedBreedId) {
    loader.style.display= 'block';

    axios
    .get(
        `https://api.thecatapi.com/v1/images/search?breed_ids=${selectedBreedId}`
    )
    .then(response => {
        loader.style.display= 'none';

        const catData = response.data;
        if (
        catData &&
        catData.length > 0 &&
        catData[0].breeds &&
        catData[0].breeds.length > 0
        ) {
        const catImage = catData[0].url;
        const catBreed = catData[0].breeds[0];

        const imgElement = document.createElement('img');
        imgElement.src = catImage;
        imgElement.alt = 'Cat Image';
        imgElement.classList.add('catPicture');

      // Crear el contenido del ul
        const ulElement = document.querySelector('.cat-completeInfo');
        ulElement.innerHTML = `
        <li><h2>${catBreed.name}</h2></li>
        <li><p>${catBreed.description}</p></li>
        <li><p><strong>Temperament:</strong> ${catBreed.temperament}</p></li>
        `;
        
        catInfo.innerHTML = '';

        catInfo.appendChild(imgElement);
        catInfo.appendChild(ulElement);
        } else {
        catInfo.innerHTML = '<p>No cat data available</p>';
        }
    })
    .catch(error => {
        loader.style.display= 'none';
        console.error('Error fetching cat data:', error);
        catInfo.innerHTML =
        '<p>Oops! Something went wrong while fetching cat data.</p>';
    });
}
