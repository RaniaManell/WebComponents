const getBaseURL = () => {
    return new URL('.', import.meta.url);
};

let template = document.createElement("template");
template.innerHTML = `
<style>
input[type="range"] {
    accent-color: #d0a481;
  }
</style>
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

    setAudioContext(ctx) {
        this.context = ctx;
    }

    getInputNode() {
        // on renvoie le premier noeud du graphe audio
        return this.filters[0];
    }

    getOutputNode() {
        // On renvoie le dernier noeud du graphe audio
        return this.filters[this.filters.length - 1];
    }


    applyEqualizer() {
        // On crée un graphe audio composé de noeuds biquad filter

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