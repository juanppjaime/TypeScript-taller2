import { Serie } from './series.js';
import { data } from './data.js';

const seriesTbody = document.getElementById('series');
const containerCard = document.getElementById('container-card');
let averageSeasons = 0;
const defaultImages = {
    1: 'Bad.jpg',
    2: 'Orange.jpg',
    3: 'Games.jpg',
    4: 'Big.jpg',
    5: 'Holmes.jpg',
    6: 'English.jpg'
};
function loadImage(imgElement, imageUrl, serieId) {
    imgElement.src = imageUrl;
    imgElement.onerror = function() {
        imgElement.src = defaultImages[serieId];
    };
}

renderSeriesInTable(data);

seriesTbody.addEventListener('click', function (event) {
    const activeElement = event.target;
    if (activeElement.tagName === 'TH' || activeElement.tagName === 'TD') {
        const fila = activeElement.parentElement;
        const id = fila.cells[0].textContent;
        console.log(`Fila ${id} seleccionada`);
        const selectedSerie = data.find(serie => parseInt(id) === serie.id);
        if (selectedSerie) {
            mostrarSerie(selectedSerie);
        }
    }
});

function mostrarSerie(selectedSerie) {
    const card = document.createElement('div');
    card.className = 'card';
    card.style.width = '18rem';

    const cardImg = document.createElement('img');
    cardImg.className = 'card-img-top';
    cardImg.alt = selectedSerie.name;

    loadImage(cardImg, selectedSerie.imagen, selectedSerie.id);
    
    const cardBody = document.createElement('div');
    cardBody.className = 'card-body';

    const cardTitle = document.createElement('h5');
    cardTitle.className = 'card-title';
    cardTitle.style.fontWeight = 'bold';
    cardTitle.textContent = selectedSerie.name;

    const cardText = document.createElement('p');
    cardText.className = 'card-text';
    cardText.textContent = selectedSerie.descripcion;

    const cardLink = document.createElement('a');
    cardLink.href = selectedSerie.url;
    cardLink.target = '_blank';
    cardLink.textContent = 'Read more';

    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardText);
    cardBody.appendChild(cardLink);

    card.appendChild(cardImg);
    card.appendChild(cardBody);

    containerCard.innerHTML = '';
    containerCard.appendChild(card);
}

function renderSeriesInTable(series) {
    console.log('Leyendo series...');
    seriesTbody.innerHTML = ''; 
    series.forEach(function (serie) {
        const trElement = document.createElement('tr');
        trElement.innerHTML = `
            <th>${serie.id}</th>
            <td class="text-primary">${serie.name}</td>
            <td>${serie.channel}</td>
            <td>${serie.season}</td>
        `;
        seriesTbody.appendChild(trElement);
        averageSeasons += serie.season;
        console.log(`Serie ${serie.id} leída`);
    });
    averageSeasons /= series.length;
    document.getElementById('average').innerHTML = `Seasons Average: ${averageSeasons.toFixed(2)}`; 
    console.log('Lectura terminada');
}
