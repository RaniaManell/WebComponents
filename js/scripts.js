
  window.onload = init;

  function init() {
    // appelée quand la page est affichée
    console.log("Page chargée");
    // on récupère le lecteur audio
    const player = document.querySelector("#player");
    // on récupère la playlist
    const playlist = document.querySelector("#playlist");

    player.setPlaylist(playlist);
  }
  
// scripts.js
/*
function playTrack(trackUrl, element) {
  const audio = document.getElementById('audio');
  audio.src = trackUrl;
  audio.play();

  // Supprimer la classe active de tous les éléments de la liste
  const tracklist = document.querySelectorAll('.tracklist li');
  tracklist.forEach(item => item.classList.remove('active'));

  // Ajouter la classe active à l'élément sélectionné
  element.classList.add('active');
}
// Fonction pour définir le volume
function setVolume() {
  const audio = document.getElementById('audio');
  const volume = document.getElementById('volume').value;
  audio.volume = volume;
}

// Fonction pour définir la fréquence
function setFrequency() {
  const audio = document.getElementById('audio');
  const frequency = document.getElementById('frequency').value;
  audio.playbackRate = frequency;
}
// Fonctions pour jouer, mettre en pause et arrêter la lecture
function play() {
  const audio = document.getElementById('audio');
  audio.play();
}

function pause() {
  const audio = document.getElementById('audio');
  audio.pause();
}

function stop() {
  const audio = document.getElementById('audio');
  audio.pause();
  audio.currentTime = 0;
}
// Fonctions pour piste suivante et précédente
function nextTrack() {
  const tracklist = document.querySelectorAll('.tracklist li');
  const activeTrack = document.querySelector('.tracklist li.active');
  const index = Array.from(tracklist).indexOf(activeTrack);

  if (index < tracklist.length - 1) {
    tracklist[index + 1].click();
  }
}

function previousTrack() {
  const tracklist = document.querySelectorAll('.tracklist li');
  const activeTrack = document.querySelector('.tracklist li.active');
  const index = Array.from(tracklist).indexOf(activeTrack);

  if (index > 0) {
    tracklist[index - 1].click();
  }
}
// Fonctions pour régler la balance, les basses et les aigus
function setBalance() {
  const audio = document.getElementById('audio');
  const balance = document.getElementById('balance').value;
  audio.pan.value = balance;
}

function setBass() {
  const audio = document.getElementById('audio');
  const bass = document.getElementById('bass').value;
  audio.setSinkId(bass);
}

function setTreble() {
  const audio = document.getElementById('audio');
  const treble = document.getElementById('treble').value;
  audio.setSinkId(treble);
}

*/