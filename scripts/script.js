"use strict";

// *****************************************
// Variaveis e Funcoes Auxiliares
// *****************************************
//
let delayInMilliseconds = 500;

const isEven = (number) => (number % 2 == 0 ? true : false);

// Funcao para deixar Array aleatoria
function comparador() {
  return Math.random() - 0.5;
}

// Retorna o nome da carta (gif)
const parrotName = (card) =>
  card.querySelector(".parrot-back").getAttribute("src");

// *****************************************
// Selecao e distribuicao das cartas
// *****************************************
//
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
const nCardsMin = 4;
const nCardMax = parrotsGif.length * 2;
let nCards = 0;

// Leitura da qnte de cartas
while (!(isEven(nCards) && nCards >= nCardsMin && nCards <= nCardMax)) {
  nCards = Number(
    prompt(
      `Informe a quantidade de cartas que deseja jogar (numeros pares de ${nCardsMin} a ${nCardMax})`
    )
  );
}

// Criar e Embaralhar o total de cartas
const nPair = nCards / 2;
const parrotsGifGame = parrotsGif.sort(comparador).slice(0, nPair);
const cardsShuffled = parrotsGifGame.concat(parrotsGifGame).sort(comparador);

//Distribuir cartas no tabuleiro
const tabuleiro = document.querySelector(".container");
for (let i = 0; i < nCards; i++) {
  tabuleiro.innerHTML += `
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

// *****************************************
// Funcoes e variaveis para regras do jogo
// *****************************************
//
// Variaveis de Controle
let roundsCounter = 0;
let isFirstCard = true;

// Vira a carta
function turnCard(card) {
  card.classList.add("turn");
}

// Desvira as catas que nao deram Match
function unturnCard(card) {
  card.classList.remove("turn"); //desvirar carta atual
  document.querySelector(".turn").classList.remove("turn"); //desvira a primeira carta da rodada
}

// Marca as cartas que deram Match
function matchCard(card) {
  const cardsMatched = document.querySelectorAll(".turn");
  for (let i = 0; i < cardsMatched.length; i++) {
    cardsMatched[i].classList.remove("turn");
    cardsMatched[i].classList.add("match");
  }
  const totalMatched = document.querySelectorAll(".match").length;
  if (totalMatched === nCards) {
    setTimeout(endOfGame, delayInMilliseconds);
  }
}

// Variaveis para cartas de cada round
let firstCardBack = 0;
let secondCardBack = 0;
function checkCard(card) {
  // Considera apenas os clicks de cartas que nao formaram par nem estao viradas
  if (!card.classList.contains("match") && !card.classList.contains("turn")) {
    turnCard(card);
    if (isFirstCard) {
      firstCardBack = parrotName(card);
      console.log(`1 - ${firstCardBack}`);
      isFirstCard = false;
    } else {
      secondCardBack = parrotName(card);
      console.log(`2 - ${secondCardBack}`);
      if (firstCardBack === secondCardBack) {
        matchCard(card);
      } else {
        setTimeout(unturnCard, delayInMilliseconds, card);
      }
      roundsCounter++; //incremeta round
      isFirstCard = true; //condicao para proxima rodada
    }
  }
}

function endOfGame() {
  alert(`Fim de Jogo
  Numero de tentativas: ${roundsCounter}`);
}
