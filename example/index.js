const header = document.querySelector('header');
const section = document.querySelector('section');

let requestURL = 'https://mdn.github.io/learning-area/javascript/oojs/json/superheroes.json';

let request = new XMLHttpRequest();

request.open('GET', requestURL);

request.responseType = 'json';

request.send();

request.onload = function () {
  const superHeroes = request.response;
  populateHeader(superHeroes);
  showHeroes(superHeroes);
};

function populateHeader(obj) {
  const myH1 = document.createElement('h1');
  myH1.textContent = obj['squadName'];
  header.appendChild(myH1);

  const myPara = document.createElement('p');
  myPara.textContent = 'Hometown: ' + obj['homeTown'] + ' // Formed: ' + obj['formed'];
  header.appendChild(myPara);
}

function showHeroes(obj) {
  const heroes = obj['members'];

  for (let i = 0; i < heroes.length; i++) {
    const myArticle = document.createElement('article');
    const myH2 = document.createElement('h2');
    const myPara1 = document.createElement('p');
    const myPara2 = document.createElement('p');
    const myPara3 = document.createElement('p');
    const myList = document.createElement('ul');

    myH2.textContent = heroes[i].name;
    myPara1.textContent = 'Secret identity: ' + heroes[i].secretIdentity;
    myPara2.textContent = 'Age: ' + heroes[i].age;
    myPara3.textContent = 'Superpowers:';

    const superPowers = heroes[i].powers;
    for (let j = 0; j < superPowers.length; j++) {
      const listItem = document.createElement('li');
      listItem.textContent = superPowers[j];
      myList.appendChild(listItem);
    }

    myArticle.append(myH2, myPara1, myPara2, myPara3, myList);

    section.appendChild(myArticle);
  }
}

// import { XMLHttpRequest } from 'xmlhttprequest';

// const fetchData = (urlApi) => {
//   return new Promise((resolve, reject) => {
//     const xhttp = new XMLHttpRequest();
//     xhttp.open('GET', urlApi, true);
//     xhttp.onreadystatechange = () => {
//       if (xhttp.readyState === 4) {
//         xhttp.status === 200 ? resolve(JSON.parse(xhttp.responseText)) : reject(new Error('Error', urlApi));
//       }
//     };
//     // NOTE: Antes de terminar el proceso se debe enviar la solicitud.
//     xhttp.send();
//   });
// };
