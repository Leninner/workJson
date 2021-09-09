const API = 'https://rickandmortyapi.com/api/character/';
const carouselContainers = document.querySelector('.carousel__container');
const infoDetails = document.querySelector('.infoDetails');
const contenedorInfoDetails = document.querySelector('.contenedor--infoDetails');

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
  const pTitle = document.createElement('p');
  const pSubtitle = document.createElement('p');

  carouselItem.classList.add('carousel-item');
  imgMain.classList.add('carousel-item__img');
  carouselItemDetails.classList.add('carousel-item__details');
  pTitle.classList.add('carousel-item__details--title');
  pSubtitle.classList.add('carousel-item__details--subtitle');

  imgMain.src = `${obj.results[iterador].image}`;
  imgMain.alt = `${obj.results[iterador].id}`;
  pTitle.textContent = `${obj.results[iterador].name}`;
  pSubtitle.textContent = `${obj.results[iterador].species} | ${obj.results[iterador].gender}`;

  carouselItemDetails.append(pTitle, pSubtitle);
  carouselItem.append(imgMain, carouselItemDetails);
  carouselContainers.appendChild(carouselItem);
};

const displayItemPersonal = (data) => {
  const hTitle = document.createElement('h3');
  const imgTitle = document.createElement('img');
  const estado = document.createElement('p');
  const genero = document.createElement('p');
  const especie = document.createElement('p');
  const origen = document.createElement('p');
  const location = document.createElement('p');

  hTitle.textContent = `${data.name}`;
  imgTitle.src = `${data.image}`;
  imgTitle.alt = `${data.id}`;
  estado.textContent = `Estado: ${data.status}`;
  genero.textContent = `Género: ${data.gender}`;
  especie.textContent = `Especie: ${data.species}`;
  origen.textContent = `Origen: ${data.origin.name}`;
  location.textContent = `Location: ${data.location.name}`;

  contenedorInfoDetails.append(hTitle, imgTitle, estado, especie, genero, origen, location);
};

for (let i = 0; i < 20; i++) {
  fetchData(API)
    .then((data) => {
      displayItem(data, i);
    })
    .catch((error) => console.error(error));
}

carouselContainers.addEventListener('click', (e) => {
  if (e.target.nodeName === 'IMG') {
    infoDetails.classList.add('active');
    fetchData(API)
      .then((data) => {
        return data.results[e.target.alt - 1];
      })
      .then((data) => {
        displayItemPersonal(data);
      })
      .catch((error) => console.error(error));
  }
});

infoDetails.addEventListener('click', (e) => {
  if (e.target.nodeName === 'SECTION') {
    infoDetails.classList.remove('active');
    contenedorInfoDetails.innerHTML = '';
  }
});
