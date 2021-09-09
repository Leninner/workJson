const carouselContainers = document.querySelector('.carousel__container');
const infoDetails = document.querySelector('.infoDetails');
const cerrarInfoDetails = document.querySelector('.cerrar-infoDetails');

cerrarInfoDetails.onclick = () => {
  infoDetails.classList.remove('active');
};

carouselContainers.addEventListener('click', (e) => {
  if (e.target.nodeName === 'IMG') {
    infoDetails.classList.add('active');
  }
});

const fetchData = (urlApi) => {
  return new Promise((resolve, reject) => {
    const xhttp = new XMLHttpRequest();
    xhttp.open('GET', urlApi, true);
    xhttp.onreadystatechange = () => {
      if (xhttp.readyState === 4) {
        xhttp.status === 200 ? resolve(JSON.parse(xhttp.responseText)) : reject(new Error('Error', urlApi));
      }
    };
    // NOTE: Antes de terminar el proceso se debe enviar la solicitud.
    xhttp.send();
  });
};

const displayItem = (obj, iterador) => {
  const carouselItem = document.createElement('div');
  const imgMain = document.createElement('img');
  const carouselItemDetails = document.createElement('div');
  const divUno = document.createElement('div');
  const imgSeeInfo = document.createElement('img');
  const pTitle = document.createElement('p');
  const pSubtitle = document.createElement('p');

  carouselItem.classList.add('carousel-item');
  imgMain.classList.add('carousel-item__img');
  carouselItemDetails.classList.add('carousel-item__details');
  pTitle.classList.add('carousel-item__details--title');
  pSubtitle.classList.add('carousel-item__details--subtitle');

  imgMain.src = `${obj.results[iterador].image}`;
  imgMain.alt = `${obj.results[iterador].id}`;
  imgSeeInfo.src = 'https://img.icons8.com/glyph-neue/64/000000/connection-status-off.png';
  imgSeeInfo.alt = 'play';
  pTitle.textContent = `${obj.results[iterador].name}`;
  pSubtitle.textContent = `${obj.results[iterador].species} | ${obj.results[iterador].gender}`;

  divUno.appendChild(imgSeeInfo);
  carouselItemDetails.append(divUno, pTitle, pSubtitle);
  carouselItem.append(imgMain, carouselItemDetails);
  carouselContainers.appendChild(carouselItem);
};

const API = 'https://rickandmortyapi.com/api/character/';

for (let i = 0; i < 20; i++) {
  fetchData(API)
    .then((data) => {
      displayItem(data, i);
    })
    .catch((error) => console.error(error));
}
