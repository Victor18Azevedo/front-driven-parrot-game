// *****************************************
// *****************************************
// Funcoes Auxiliares
// *****************************************
//
// Funcao para verificar se eh Par (Even)
const isEven = (number) => (number % 2 == 0 ? true : false);

// Funcao para alterar ordem da Array
function comparador() {
  return Math.random() - 0.5;
}

// Funcao que retorna o nome da carta (gif)
const parrotName = (card) =>
  card.querySelector(".parrot-back").getAttribute("src");

// *****************************************
// *****************************************
// Funcoes para Inicializar Jogo e Distribuir as cartas
// *****************************************
//
// Funcao para iniciar o jogo
function startParrotGame() {
  // Variaveis de Controle
  timer = 0;
  idTimer = 0;
  roundsCounter = 0;
  isFirstCard = true;
  firstCardName = 0;
  secondCardName = 0;
  flagWait = false;

  numberOfCards = loadNumberCards();
  dealCards(numberOfCards);
}

// Ler quantidade de cartas
function loadNumberCards() {
  let nCards = 0;
  while (!(isEven(nCards) && nCards >= nCardsMin && nCards <= nCardMax)) {
    nCards = Number(
      prompt(
        `Informe a quantidade de cartas que deseja jogar (numeros pares de ${nCardsMin} a ${nCardMax})`
      )
    );
  }
  return nCards;
}

// Criar, Embaralhar e Distribuir  o total de cartas
function dealCards(numberOfCards) {
  const nPair = numberOfCards / 2;
  const parrotsGifGame = parrotsGif.sort(comparador).slice(0, nPair);
  const cardsShuffled = parrotsGifGame.concat(parrotsGifGame).sort(comparador);
  //Distribuir cartas no tabuleiro
  const tabuleiroUpper = document.querySelector(".container-upper");
  for (let i = 0; i < nPair; i++) {
    tabuleiroUpper.innerHTML += `
    <div class="card" onclick="checkCard(this)">
      <div class="front-face face">
        <img
          class="parrot-front"
          src="./images/parrot.png"
          alt="a parrot"
        />
      </div>
      <div class="back-face face">
        <img
          class="parrot-back"
          src="./images/${cardsShuffled[i]}"
          alt="a parrot's gif"
        />
      </div>
    </div>`;
  }
  const tabuleiroDown = document.querySelector(".container-down");
  for (let i = nPair; i < numberOfCards; i++) {
    tabuleiroDown.innerHTML += `
    <div class="card" onclick="checkCard(this)">
      <div class="front-face face">
        <img
          class="parrot-front"
          src="./images/parrot.png"
          alt="a parrot"
        />
      </div>
      <div class="back-face face">
        <img
          class="parrot-back"
          src="./images/${cardsShuffled[i]}"
          alt="a parrot's gif"
        />
      </div>
    </div>`;
  }
  // Inicia a contagem do timer;
  idTimer = setInterval(countTimer, intervalSeconds * 1000);
}

// *****************************************
// *****************************************
// Funcoes para as egras do jogo
// *****************************************

// Virar a carta
function turnCard(card) {
  card.classList.add("turn");
}

// Desvirar as catas que nao deram Match
function unturnCard(card) {
  card.classList.remove("turn"); //desvira carta atual
  document.querySelector(".turn").classList.remove("turn"); //desvira a primeira carta da rodada
  flagWait = false; // libera virar apos desvirar as 2 cartas
}

// Marcar as cartas que deram Match
function matchCard(card) {
  const cardsMatched = document.querySelectorAll(".turn");
  for (let i = 0; i < cardsMatched.length; i++) {
    cardsMatched[i].classList.remove("turn");
    cardsMatched[i].classList.add("match");
  }
  const totalMatched = document.querySelectorAll(".match").length;
  if (totalMatched === numberOfCards) {
    clearInterval(idTimer);
    setTimeout(endOfGame, oneSecond);
  }
}

// Verifica carta clicada
function checkCard(card) {
  //Evita virar a 3 carta
  if (!flagWait) {
    // Considera apenas os clicks de cartas que nao formaram par nem estao viradas
    if (!card.classList.contains("match") && !card.classList.contains("turn")) {
      turnCard(card);
      if (isFirstCard) {
        firstCardName = parrotName(card);
        console.log(`1 - ${firstCardName}`);
        isFirstCard = false;
      } else {
        secondCardName = parrotName(card);
        console.log(`2 - ${secondCardName}`);
        if (firstCardName === secondCardName) {
          matchCard(card);
        } else {
          flagWait = true;
          console.log(flagWait);
          setTimeout(unturnCard, oneSecond, card);
        }
        roundsCounter++; //incremeta round
        isFirstCard = true; //condicao para proxima rodada
      }
    }
  }
}

function endOfGame() {
  alert(
    `Você ganhou em ${roundsCounter} jogadas em ${timer.toFixed(1)} segundos!`
  );

  clearTabuleiro();

  let reload = prompt("Deseja jogar novamente?\nDigite: 'sim' ou não'");
  while (!["sim", "não"].includes(reload)) {
    reload = prompt("Deseja jogar novamente?\nDigite: 'sim' ou não'");
    console.log("laco", reload);
  }
  if (reload === "sim") {
    startParrotGame();
    console.log();
  }
  console.log("FINAL");
}

function countTimer() {
  timer += intervalSeconds;
  elementoTimer.innerHTML = timer.toFixed(1);
}

function clearTabuleiro() {
  const tabuleiroUpper = document.querySelector(".container-upper");
  const tabuleiroDown = document.querySelector(".container-down");
  tabuleiroUpper.innerHTML = "";
  tabuleiroDown.innerHTML = "";
  elementoTimer.innerHTML = 0;
}

// *****************************************
// Variaveis Auxiliares
// *****************************************
const oneSecond = 1000;
const intervalSeconds = 0.1;
let timer = 0;
let idTimer = 0;
const elementoTimer = document.querySelector(".timer");

// *****************************************
// Variaveis Controle do Jogo
// *****************************************
// Cartas do jogo:
const parrotsGif = [
  "60fps_parrot.gif",
  "mergeconflictparrot.gif",
  "beer_parrot.gif",
  "chef-parrot.gif",
  "conga_party_parrot.gif",
  "everythings_fine_parrot.gif",
  "redhatparrot.gif",
];

// Numero de cartas permitido
const nCardsMin = 4;
const nCardMax = parrotsGif.length * 2;

// Numero de cartas da rodada
let numberOfCards = 0;

// Variaveis de Controle
let roundsCounter = 0;
let isFirstCard = true;

// Variaveis para  identificar as cartas de cada viradas a cada rodada
let firstCardName = 0;
let secondCardName = 0;

let flagWait = false; // Evita virar 3 cartas

// *****************************************
// *****************************************
// Iniciar o jogo
// *****************************************
// *****************************************
startParrotGame();
