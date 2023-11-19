import axios from 'axios';

export function fetchCatByBreed(selectedBreedId) {
    const catInfo = document.querySelector('.cat-info');

    axios
    .get(
        `https://api.thecatapi.com/v1/images/search?breed_ids=${selectedBreedId}`
    )
    .then(response => {
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
        <li><p><strong>Description:</strong> ${catBreed.description}</p></li>
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
        console.error('Error fetching cat data:', error);
        catInfo.innerHTML =
        '<p>Oops! Something went wrong while fetching cat data.</p>';
    });
}
