'use strict';

// id score--0 simpan ke score0
const score0EL = document.querySelector('#score--0');
// cara lain pilih by id langsung isi nama id yang katanya lebih cepat manggil id ini
const score1EL = document.getElementById('score--1');
// gambar dice
const diceEL = document.querySelector('.dice');
// tombol roll
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

const current0EL = document.getElementById('current--0');
const current1EL = document.getElementById('current--1');

const pemain0EL = document.querySelector('.player--0 ');
const pemain1EL = document.querySelector('.player--1 ');

let masihMain, scores, currentScore, currentPlayer;

// init buat mulai baru
const init = () => {
  scores = [0, 0];
  masihMain = true;
  currentScore = 0;
  currentPlayer = 0;

  score0EL.textContent = 0;
  score1EL.textContent = 0;

  current0EL.textContent = 0;
  current1EL.textContent = 0;

  diceEL.classList.add('sembunyi');
  pemain0EL.classList.remove('player--winner');
  pemain1EL.classList.remove('player--winner');
  pemain0EL.classList.add('player--active');
  pemain1EL.classList.remove('player--active');
};

// tiap buka init dulu
init();

// buat ganti player
const gantiPlayer = () => {
  document.getElementById(`current--${currentPlayer}`).textContent = 0;
  currentPlayer = currentPlayer === 0 ? 1 : 0;
  currentScore = 0;

  //ganti class buat kotak player aktif. gantian
  pemain0EL.classList.toggle('player--active');
  pemain1EL.classList.toggle('player--active');
};

// buat rolling
btnRoll.addEventListener('click', function () {
  if (masihMain) {
    // 1. buat random
    const dice = Math.trunc(Math.random() * 6) + 1;
    // console.log(dice);

    // 2. tampilkan dice
    diceEL.classList.remove('sembunyi');
    diceEL.src = `dice-${dice}.png`;

    // 3. jika dice = 1 ganti pemain
    if (dice !== 1) {
      currentScore += dice;

      // score menyesuaikan angka player sekarang
      document.getElementById(`current--${currentPlayer}`).textContent =
        currentScore;
    } else {
      // ganti pemain
      gantiPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (masihMain) {
    //1. tambah current score ke player yang aktif
    // menyesuaikan index 0 dan 1. sesuai dengan player yang aktif saat ini
    scores[currentPlayer] += currentScore;

    document.getElementById(`score--${currentPlayer}`).textContent =
      scores[currentPlayer];

    //2. cek jika score >= 100 selesai game
    if (scores[currentPlayer] >= 100) {
      // selesai
      diceEL.classList.add('sembunyi');
      masihMain = false;
      document
        .querySelector(`.player--${currentPlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${currentPlayer}`)
        .classList.remove('player--active');
    } else {
      // ganti pemain
      gantiPlayer();
    }
  }
});

// game baru
btnNew.addEventListener('click', init);
