let template = document.createElement("template");
template.innerHTML = `
<style>
.tracklist {
  align-items: center;
  padding-left: 20px;
  justify-content: center;
}
.tracklist li {
    display: flex;
    justify-content: space-between;
 
    justify-content: left;
    border-bottom: 1px solid #ddd;
    cursor: pointer;
    color: #fff; /* Couleur par défaut pour le texte */
    transition: color 0.3s ease; /* Transition de couleur au survol */
}
  
.tracklist li:hover {
    background-color: #6d4b2f;
}
  
.tracklist li:active {
    background-color: #eaac2f; 
}

</style>
<div class="playlist">
        <div class="list-header">
  

        </div>
        <ul id="playlist" class="tracklist">
          <li class="song" id="./assets/feet.mp3">
              <span class="track-number">1.</span>
              &nbsp;
              <span class="track-title">Feet Don’t Fail Me Now</span>
              &nbsp;
              <span class="track-artist">- Joy Crookes</span>
              &nbsp;
              <span class="track-time">3:30</span>
          </li>
          <li class="song" id="./assets/coldplay.mp3">
            <span class="track-number">2.</span>
            &nbsp;
            <span class="track-title">Let somebody go</span>
            &nbsp;
            <span class="track-artist">- Coldplay X Selena Gomez</span>
            &nbsp;
            <span class="track-time">4:05</span>
          </li>
          <li class="song" id="./assets/harry.mp3">
            <span class="track-number">3.</span>
            &nbsp;
            <span class="track-title">As it was</span>
            &nbsp;
            <span class="track-artist">- Harry Styles</span>
            &nbsp;
            <span class="track-time">4:05</span>
        </li>
        </ul>
      </div>
`;

export class MyPlaylist extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        console.log("PLAYLIST")
        this.shadowRoot.innerHTML = template.innerHTML;
        this.definirEcouteurs();
    }

    definirEcouteurs() {
        const tracklist = this.shadowRoot.querySelectorAll("li");
        tracklist.forEach((item) => {
            // on definit un écouteur sur chaque élément de la liste
            item.onclick = (event) => {
                // get the li that generated the event
                // we want the real target
                const li = event.target.closest("li");
                
                console.log('On veut jouer le morceau ' + li.id);
                // Attention, le qu'il faudra donner au lecteur audio
                // est dans l'attribut id de l'élément li
                // on prend donc li.id et on l'envoie dans un événement
                // 
                this.dispatchEvent(new CustomEvent("playsong", {
                    detail: {
                        trackUrl: li.id,
                    },
                    bubbles: true,
                    composed: true,
                }));
            }
        });

    }
}

customElements.define("my-playlist", MyPlaylist);