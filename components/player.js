// utile pour récupérer l'URL du composant
const getBaseURL = () => {
	return new URL('.', import.meta.url);
};

let template = document.createElement("template");
template.innerHTML = `
<style>

.audio-player {
    margin-bottom: 20px; 
}
.audio-controls {
    display: flex;
    flex-direction: column;
    align-items: left;
    padding-left: 20px;
  
}
.control {
    margin-bottom: 15px;
}
.controls {
    width: 400px;
    padding-top: 0px;
    margin-top: 60px;
    padding-left: 233px;

}
.btn {background-color: #838388;
    height: 20px;
    width: 43px;
    margin-right: 2px;
    shadow: 0 0 0 0;
    border : 0 none;
}
.auteur{
    background-color: #58595b;
    border-radius: 5px;
    width: 200px;
    padding-left: 20px;
    padding-top: 2px;
    padding-bottom: 2px;
   
.p{
margin-bottom: 0px;

}
.div-controls{
    display: flex;
    flex-direction: column;
}
.autre-controls{
    width: 50%;
}
.control-auteur{
    width: 50%;
}




</style>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" integrity="...">

<br>

<div class="audio-controls">
    <div class="div-controls">
        <div class="autre-controls">
            <div class="control">
                <label for="volume">Volume:</label>
                <input type="range" id="volume" name="volume" min="0" max="1" step="0.1" value="2">
            </div>
            <div class="control">
                <label for="vitesse">Vitesse:</label>
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
        </div>
        <div class="control-auteur">
            <div class="control auteur">
                <p>Nouar Rania Manel</p>
                <p>Gasmi Zeyneb</p>
            </div>
        </div>   
    </div>
    <div class="control controls">
        <button class ="btn" id="previous"><i class="fas fa-step-backward"></i></button>
        <!-- Icône pour Previous -->
        <button class ="btn" id="play"><i class="fas fa-play"></i></button>
        <!-- Icône pour Play -->
        <button class ="btn" id="pause"><i class="fas fa-pause"></i></button>
        <!-- Icône pour Pause -->
        <button class ="btn" id="stop"><i class="fas fa-stop"></i></button>
        <!-- Icône pour Stop -->
        <button class ="btn" id="next"><i class="fas fa-step-forward"></i></button>
        <!-- Icône pour Next -->
    </div>




</div>
<div class="audio-player">
    <div class="audio-wrapper">
        <audio id="audio" controls></audio>
    </div>
    
</div>
<div id= "equalizer" class="audio-equalizer">
    <h2>Equalizer</h2>
    <div class="controls">
    <label for="slider1">60Hz</label>
    <input type="range" id="slider1" value="0" step="1" min="-30" max="30"></input>
  <output id="gain0">0 dB</output>
  </div>
  <div class="controls">
    <label for="slider2">170Hz</label>
    <input type="range" id="slider2" value="0" step="1" min="-30" max="30" ></input>
<output id="gain1">0 dB</output>
  </div>
  <div class="controls">
    <label for="slider3">350Hz</label>
    <input type="range" id="slider3" value="0" step="1" min="-30" max="30" ></input>
<output id="gain2">0 dB</output>
  </div>
  <div class="controls">
    <label for="slider4">1000Hz</label>
    <input type="range" id="slider4" value="0" step="1" min="-30" max="30" ></input>
<output id="gain3">0 dB</output>
  </div>
  <div class="controls">
    <label for="slider5">3500Hz</label>
    <input type="range" id="slider5" value="0" step="1" min="-30" max="30" ></input>
<output id="gain4">0 dB</output>
  </div>
  <div class="controls">
    <label for="slider6">10000Hz</label>
    <input type="range" id="slider6" value="0" step="1" min="-30" max="30" oninput="changeGain(this.value, 5);"></input>
<output id="gain5">0 dB</output>
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
        // hide the audio tag
        this.player.style.display = "none";
         // Add the equalizer to the player instance
        this.equalizer = this.shadowRoot.querySelector("#equalizer");
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
        // Fonction pour définir previous
        this.shadowRoot.querySelector("#previous").addEventListener("click", (evt) => {
            // evt.target est l'élément qui a déclenché l'événement, c'est le bouton previous
            console.log("Previous");
            this.playlist.previous();
         
        });
        // Fonction pour définir next
        this.shadowRoot.querySelector("#next").addEventListener("click", (evt) => {
            // evt.target est l'élément qui a déclenché l'événement, c'est le bouton next
            console.log("Next");
            this.playlist.next();
        });
        // Fonction pour définir play
        this.shadowRoot.querySelector("#play").addEventListener("click", (evt) => {
            // evt.target est l'élément qui a déclenché l'événement, c'est le bouton play
            console.log("Play");
            this.player.play();
        });
        // Fonction pour définir pause
        this.shadowRoot.querySelector("#pause").addEventListener("click", (evt) => {
            // evt.target est l'élément qui a déclenché l'événement, c'est le bouton pause
            console.log("Pause");
            this.player.pause();
        });
        // Fonction pour définir stop   
        this.shadowRoot.querySelector("#stop").addEventListener("click", (evt) => {
            // evt.target est l'élément qui a déclenché l'événement, c'est le bouton stop
            console.log("Stop");
            this.player.pause();
            this.player.currentTime = 0;
        });
         // Listen for the 'input' event from the equalizer sliders
         this.equalizer.querySelectorAll("input[type='range']").forEach((slider, index) => {
        slider.addEventListener("input", () => {
          // Log the value whenever a slider is moved
          console.log(`Slider ${slider.id} value: ${slider.value}`);
          this.applyEqualizer();
        });
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

    applyEqualizer() {
        // Create the AudioContext and sourceNode if not already created
        if (!this.context) {
          this.context = new AudioContext();
          this.mediaElement = this.shadowRoot.getElementById('audio'); // Assuming your audio element has the id 'audio'
          this.sourceNode = this.context.createMediaElementSource(this.mediaElement);
      
          // Handle the resume on play
          this.mediaElement.onplay = () => {
            this.context.resume();
          }
      
          // Create the equalizer filters
          this.filters = [];
      
          // Set filters
          [60, 170, 350, 1000, 3500, 10000].forEach((freq, i) => {
            const eq = this.context.createBiquadFilter();
            eq.frequency.value = freq;
            eq.type = "peaking";
            eq.gain.value = 0;
            this.filters.push(eq);
          });
      
          // Connect filters in series
          this.sourceNode.connect(this.filters[0]);
          for (let i = 0; i < this.filters.length - 1; i++) {
            this.filters[i].connect(this.filters[i + 1]);
          }
      
          // Connect the last filter to the speakers
          this.filters[this.filters.length - 1].connect(this.context.destination);
        }
      
        // Adjust gain values based on equalizer settings
        const sliders = this.equalizer.querySelectorAll("input[type='range']");
        sliders.forEach((slider, index) => {
          const sliderValue = parseFloat(slider.value);
          const nbFilter = index; // Assuming the index of the slider corresponds to the filter number
      
          // Adjust gain for the specified filter
          this.changeGain(sliderValue, nbFilter);
        });
      
        console.log("Equalizer settings applied");
      }
      
      changeGain(sliderVal, nbFilter) {
        const value = parseFloat(sliderVal);
        this.filters[nbFilter].gain.value = value;
      
        // Update output labels (you can add this if needed)
        // var output = document.querySelector("#gain" + nbFilter);
        // output.value = value + " dB";
      }
      
    }
    
    


customElements.define("my-player", MyPlayer);