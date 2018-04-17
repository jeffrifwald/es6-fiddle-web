/* global window */
window.es8Example = window.es8Example || {};
window.es8Example.asyncAwait = {};

window.es8Example.asyncAwait.code = `/* 
Async and Await
*/

function fetchMeat() {
  const url = 'https://baconipsum.com/api/?type=meat-and-filler';
  return fetch(url).then(res => res.json());
}

function napTime(duration) {
  // Returning a custom Promise. Because await requires it.
  return new Promise((resolve) => {
    setTimeout(() => resolve('Times Up! ⏰'), duration);
  });
}

/* 
  Await requires a Promise to be returned and
  can only be used inside an async function.
*/ 
async function getFood() {
  console.log('Blast off 🚀');

  await fetchMeat()
    .then((bacon) => {
      console.log(bacon);
    })
    .catch((err) => {
      console.error(err);
    });

  // napTime returns a promise after given duration.
  await napTime(1000).then((res) => {
    console.log(res);
  });

  console.log('Await for me 👋');
}

getFood();

`;

window.es8Example.asyncAwait.display = 'Async and Await';
