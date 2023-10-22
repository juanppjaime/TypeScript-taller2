import { Serie } from './series.js';
import { data } from './data.js';

const seriesTbody: HTMLElement = document.getElementById('series')!;
const containerCard: HTMLElement = document.getElementById('container-card')!;
let averageSeasons: number = 0;

renderSeriesInTable(data);

seriesTbody.addEventListener('click', function(event) {
    const activeElement = event.target as HTMLElement;

    if (activeElement.tagName == 'TH' || activeElement.tagName == 'TD') {
        const fila = activeElement.parentElement as HTMLTableRowElement;
        const id = fila.cells[0].textContent;

        data.forEach((serie) => {
            if (id !== null && parseInt(id) === serie.id) {
                let selectedSerie: Serie = serie;
                mostrarSerie(selectedSerie);
            }
        });
    }
});

function mostrarSerie(selectedSerie: Serie) {

    const card = document.createElement('div');
    card.className = 'card';
    card.style.width = '18rem';

    const cardImg = document.createElement('img');
    cardImg.className = 'card-img-top';

    const cardBody = document.createElement('div');
    cardBody.className = 'card-body';

    const cardTitle = document.createElement('h5');
    cardTitle.className = 'card-title';
    cardTitle.style.fontWeight = 'bold';


    const cardText = document.createElement('p');
    cardText.className = 'card-text';

    const cardLink = document.createElement('a');
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

function renderSeriesInTable(series: Serie[]): void {
    series.forEach((serie) => {
        const trElement = document.createElement('tr');
        trElement.innerHTML = `
            <th>${serie.id}</th>
            <td class="text-primary">${serie.name}</td>
            <td>${serie.channel}</td>
            <td>${serie.season}</td>
        `;
        seriesTbody.appendChild(trElement);
        averageSeasons += serie.season;
    });

    averageSeasons /= series.length;

    const averageElement = document.getElementById('average');
    if (averageElement) {
        averageElement.innerHTML = `Seasons Average: ${averageSeasons}`;
    }
}
