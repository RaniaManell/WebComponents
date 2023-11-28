const getBaseURL = () => {
	return new URL('.', import.meta.url);
};

let template = document.createElement("template");
template.innerHTML = `
<div class="audio-controls">
    <div class="div-controls">
        <div class="autre-controls">
        <div id= "equalizer">
            <div class="control">
                <label for="slider1">60Hz</label>
                <input type="range" id="slider1" value="0" step="1" min="-30" max="30"></input>
            <output id="gain0">0 dB</output>
            </div>
            <div class="control">
                <label for="slider2">170Hz</label>
                <input type="range" id="slider2" value="0" step="1" min="-30" max="30" ></input>
            <output id="gain1">0 dB</output>
            </div>
            <div class="control">
                <label for="slider3">350Hz</label>
                <input type="range" id="slider3" value="0" step="1" min="-30" max="30" ></input>
            <output id="gain2">0 dB</output>
            </div>
            <div class="control">
                <label for="slider4">1000Hz</label>
                <input type="range" id="slider4" value="0" step="1" min="-30" max="30" ></input>
            <output id="gain3">0 dB</output>
            </div>
            <div class="control">
                <label for="slider5">3500Hz</label>
                <input type="range" id="slider5" value="0" step="1" min="-30" max="30" ></input>
            <output id="gain4">0 dB</output>
            </div>
            <div class="control">
                <label for="slider6">10000Hz</label>
                <input type="range" id="slider6" value="0" step="1" min="-30" max="30" oninput="changeGain(this.value, 5);"></input>
            <output id="gain5">0 dB</output>
            </div>

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
        </div>
        <div class="control-auteur">
            <div class="control auteur">
                <p>Nouar Rania Manel</p>
                <p>Gasmi Zeyneb</p>
            </div>
        </div>   
    </div>`;
    export class MyEqualizer extends HTMLElement {
        constructor() {
            super();
            this.attachShadow({ mode: "open" });
    
        }
    
        // ici un callback qui sera appelé une fois que le composant
        // sera affiché (on dit "connecté au DOM de la page")
        connectedCallback() {
            console.log("this is equalizer");
            this.shadowRoot.innerHTML = template.innerHTML;
    
            this.equalizer = this.shadowRoot.querySelector("#equalizer");
            this.definirLesEcouteurs();
   
        }
        definirLesEcouteurs() {
            this.equalizer.querySelectorAll("input[type='range']").forEach((slider, index) => {
                slider.addEventListener("input", () => {
                  // Log the value whenever a slider is moved
                  console.log(`Slider ${slider.id} value: ${slider.value}`);
                  this.applyEqualizer();
                });
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
    customElements.define("my-equalizer", MyEqualizer);