// utile pour récupérer l'URL du composant
const getBaseURL = () => {
	return new URL('.', import.meta.url);
};

let template = document.createElement("template");
template.innerHTML = `
<style>
.audio-player {
    margin-bottom: 20px;
    border:3px solid yellow;
  }
  .audio-controls {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .control {
    margin-bottom: 15px;
  }
</style>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
    integrity="...">
<h1>mon super lecteur</h1>
<br>
<div class="audio-player">
    <div class="audio-wrapper">
        <audio id="audio" controls></audio>
    </div>
</div>
<div class="audio-controls">
    <div class="control">
        <label for="volume">Volume:</label>
        <input type="range" id="volume" name="volume" min="0" max="1" step="0.1" value="1">
    </div>
    <div class="control">
        <label for="vitesse">Vitesse de lecture:</label>
        <input type="range" id="vitesse" name="vitesse" min="0.5" max="2" step="0.1" value="1">
        &nbsp;<span id="vitesseValue">1</span>
    </div>
    <div class="control">
        <label for="balance">Balance:</label>
        <input type="range" id="balance" name="balance" min="-1" max="1" step="0.1" value="0" onchange="setBalance()">
    </div>
    <div class="control">
        <label for="bass">Basses:</label>
        <input type="range" id="bass" name="bass" min="0" max="10" step="0.1" value="5" onchange="setBass()">
    </div>
    <div class="control">
        <label for="treble">Aigus:</label>
        <input type="range" id="treble" name="treble" min="0" max="10" step="0.1" value="5" onchange="setTreble()">
    </div>


    <div class="control">
        <button onclick="previousTrack()"><i class="fas fa-step-backward"></i></button>
        <!-- Icône pour Previous -->
        <button onclick="play()"><i class="fas fa-play"></i></button>
        <!-- Icône pour Play -->
        <button onclick="pause()"><i class="fas fa-pause"></i></button>
        <!-- Icône pour Pause -->
        <button onclick="stop()"><i class="fas fa-stop"></i></button>
        <!-- Icône pour Stop -->
        <button onclick="nextTrack()"><i class="fas fa-step-forward"></i></button>
        <!-- Icône pour Next -->
    </div>
</div>
`;

// ----- CLasse du Web Comppnent ------
export class MyPlayer extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    // ici un callback qui sera appelé une fois que le composant
    // sera affiché (on dit "connecté au DOM de la page")
    connectedCallback() {
        console.log("Composant affiché/connecté au DOM");
        this.shadowRoot.innerHTML = template.innerHTML;

        // le lecteur audio
        this.player = this.shadowRoot.querySelector("#audio");

        this.definirLesEcouteurs();
    }

    definirLesEcouteurs() {
        // Fonctions pour jouer, mettre en pause et arrêter la lecture, regler le volume etc.
        this.shadowRoot.querySelector("#volume").addEventListener("input", (evt) => {
            // evt.target est l'élément qui a déclenché l'événement, c'est le slider de volume
            let vol = evt.target.value;
            console.log("Volume changé", vol);
            console.log("Type de la valeur : " + typeof vol);

            this.player.volume = vol;
        });

        // Fonction pour définir la vitesse de lecture
        this.shadowRoot.querySelector("#vitesse").addEventListener("input", (evt) => {
            // evt.target est l'élément qui a déclenché l'événement, c'est le slider de vitesse
            let vitesse = evt.target.value;

            // on met à jour le span pour afficher la vitesse
            this.shadowRoot.querySelector("#vitesseValue").innerHTML = vitesse;

            this.player.playbackRate = vitesse;
        });
    }

    setPlaylist(playlist) {
        this.playlist = playlist;

        this.playlist.addEventListener("playsong", (evt) => {
            console.log("LECTEUR : On veut jouer le morceau " + evt.detail.trackUrl);
        
            // on transforme l'URL relative en URL absolue
            // on récupère l'URL de base du composant
            const baseURL = getBaseURL();
            // on utilise l'URL de base pour créer une URL absolue
            // à partir de l'URL relative
            const trackURL = new URL(evt.detail.trackUrl, baseURL);
            this.player.src = trackURL;
            this.player.play();
        });

    }

}

customElements.define("my-player", MyPlayer);