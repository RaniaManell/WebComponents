

 window.onload = init;

  function init() {
    // appelée quand la page est affichée
    console.log("Page chargée");
    // on récupère le lecteur audio
    const player = document.querySelector("#player");
    // on récupère la playlist
    const playlist = document.querySelector("#playlist");
     // on récupère la playlist
    
    
    player.setPlaylist(playlist);
    

    
    this.player.crossOrigin = "anonymous";
    
  
  }
  
  