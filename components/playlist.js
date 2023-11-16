let template = document.createElement("template");
template.innerHTML = `
<style>
.tracklist li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 15px;
    border-bottom: 1px solid #ddd;
    cursor: pointer;
    color: #00ff00; /* Couleur par défaut pour le texte */
    transition: color 0.3s ease; /* Transition de couleur au survol */
  }
  
  .tracklist li:hover {
    background-color: #00f;
  }
  
  .tracklist li.active {
    color: #fff; /* Couleur blanche pour l'élément actif */
    background-color: #00f; /* Vert flashy pour l'élément actif */
  }

</style>
<div class="playlist">
        <div class="list-header">
          <span>my playlist</span>

        </div>
        <ul id="playlist" class="tracklist">
          <li class="song" id="./assets/feet.mp3">
            <span class="track-number">1</span>
            <span class="track-title">Track 1</span>
            <span class="track-artist">Artist 1</span>
            <span class="track-time">3:30</span>
          </li>
          <li class="song" id="./assets/coldplay.mp3">
          <span class="track-number">2</span>
          <span class="track-title">Track 2</span>
          <span class="track-artist">Artist 2</span>
          <span class="track-time">2:30</span>
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