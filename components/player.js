// utile pour récupérer l'URL du composant
import "./equalizer/equilizer.js";
import "./balance/balance.js";

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
    width: 700px;
    padding-top: 0px;
    margin-top: 44px;
    padding-left: 30px;

}
.btn {background-color: #838388;
    height: 15px;
    width: 33px;
    margin-right: 0px;
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
}
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
.rang{
    accent-color:#eaac2f
}
.vol{
    margin-right: 120px;
    accent-color:#eaac2f
}
.vit{
    margin-left: 120px;
    accent-color:#eaac2f

}

</style>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" integrity="...">


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
        </div>   
       
        <div class="control-auteur">
            <div class="control auteur">
                <p>Nouar Rania Manel</p>
                <p>Gasmi Zeyneb</p>
            </div>
        </div>   
    </div>

    <div class="control controls">
    <input style="width:20px; margin-right:98px" class ="vol" type="range" id="volume" name="volume" min="0" max="1" step="0.1" value="2">
            
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
        <input style="width:20px; margin-left:90px" class ="vit" type="range" id="vitesse" name="vitesse" min="0.5" max="2" step="0.1" value="1">
        <span id="vitesseValue" style="display:none">1</span>    
    </div>




</div>
<div class="audio-player">
    <div class="audio-wrapper">
        <audio id="audio" controls></audio>
    </div>
    
</div>
<label        
  for="balance" style=" color: white;position: absolute; top: 320px; left: 830px  ">Balance</label>

  <my-balance         style="position: absolute; top: 340px; left: 830px"
  id ="balance"></my-balance>
<my-equalizer id="equalizer"></my-equalizer> 
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
        this.audioContext = new AudioContext();
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        // le lecteur audio
        this.player = this.shadowRoot.querySelector("#audio");
        // hide the audio tag
        this.player.style.display = "none";
        // add the balance
        this.balance = this.shadowRoot.getElementById("balance");
         // Add the equalizer to the player instance
        this.equalizer = this.shadowRoot.getElementById("equalizer");
        //create source node
        this.sourceNode = this.audioContext.createMediaElementSource(this.player);
        this.sourceNode.connect(this.audioContext.destination);
        this.audioNodes = [this.sourceNode];
        
        this.equalizer.audioContext = this.audioContext;
        this.equalizer.addAudioNode = (audioNode) =>
        this.addAudioNode(audioNode, "equalizer");
          
        this.balance.audioContext = this.audioContext;
        this.balance.addAudioNode = (audioNode) =>
        this.addAudioNode(audioNode, "balance");
        


        this.definirLesEcouteurs();
        

       
       
    }
      //Le code des fonctions connect audio node et add audio node nous l'avons récupéré du TP de Dorian 
  async connectAudioNode(audioNode) {
    //audioNode.name = name;
    const length = this.audioNodes.length;
    const previousNode = this.audioNodes[length - 1];
    previousNode.connect(audioNode);
    audioNode.connect(this.audioContext.destination);
  }
  addAudioNode(audioNode, name) {
    audioNode.name = name;
    const length = this.audioNodes.length;
    const previousNode = this.audioNodes[length - 1];
    previousNode.disconnect();
    previousNode.connect(audioNode);
    audioNode.connect(this.audioContext.destination);
    this.audioNodes.push(audioNode);
    console.log(`Linked ${previousNode.name || "input"} to ${audioNode.name}`);
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
            this.audioContext.resume().then(() => {});
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
   
       //fonction pour définir une balance
      this.balance.addEventListener("input", ({ target: { value } }) => {
        this.player.balance = parseFloat(value, 10);
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
            this.audioContext.resume().then(() => {});
        });

    }

     
    }
    
    


customElements.define("my-player", MyPlayer);