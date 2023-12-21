import "../../lib/webaudio-controls.js";
const template = document.createElement("template");

template.innerHTML =  `
    <style>
 
    .webaudioctrl-label {
      height: 0px !important;
  }
    </style>
    <div class="container" style="position: absolute;bottom:0px; top: 2px; left: 30px">
  <div class="controls" style="display:grid">

<div>

    <webaudio-slider
    src="components/equalizer/hsliderbody.png"
    knobsrc="components/equalizer/hsliderknob.png"
    value=1
    min=-30
    max=30
    step=0.1
    basewidth=24
    baseheight=128
    knobwidth=24
    knobheight=24
    ditchlength=100
    tooltip="equalizer1"    
    id="equalizer1"   
    style="margin-top: 8px" 

  >
  </webaudio-slider>
  <label id="label_0" style="font-size:12px; color:#eaac2f;margin-top:0px">0dB</label>
  </div>
  <div>

    <webaudio-slider
    src="components/equalizer/hsliderbody.png"
    knobsrc="components/equalizer/hsliderknob.png"
    value=1
    min=-30
    max=30
    step=0.1
    basewidth=24
    baseheight=128
    knobwidth=24
    knobheight=24
    ditchlength=100
    tooltip="equalizer2"    
    id="equalizer2""    
    style="margin-top: 8px" 
  >
    </webaudio-slider>
    <label id="label_1" style="font-size:12px; color:#eaac2f;margin-top:0px">0dB</label>
</div>

<div> 
    <webaudio-slider
    src="components/equalizer/hsliderbody.png"
    knobsrc="components/equalizer/hsliderknob.png"
    value=1
    min=-30
    max=30
    step=0.1
    basewidth=24
    baseheight=128
    knobwidth=24
    knobheight=24
    ditchlength=100
    tooltip="equalizer3"    
    id="equalizer3"    
    style="margin-top: 8px" 
  >

    </webaudio-slider>
    <label id="label_2" style="font-size:12px; color:#eaac2f;margin-top:0px">0dB</label>
</div>

<div>
    <webaudio-slider
    src="components/equalizer/hsliderbody.png"
    knobsrc="components/equalizer/hsliderknob.png"
    value=1
    min=-30
    max=30
    step=0.1
    basewidth=24
    baseheight=128
    knobwidth=24
    knobheight=24
    ditchlength=100
    tooltip="equalizer4"    
    id="equalizer4"    
    style="margin-top: 8px" 
  >

    </webaudio-slider>
    <label id="label_3" style="font-size:12px; color:#eaac2f;margin-top:0px">0dB</label>
</div>

<div>  
    <webaudio-slider
    src="components/equalizer/hsliderbody.png"
    knobsrc="components/equalizer/hsliderknob.png"
    value=1
    min=-30
    max=30
    step=0.1
    basewidth=24
    baseheight=128
    knobwidth=24
    knobheight=24
    ditchlength=100
    tooltip="equalizer5"    
    id="equalizer5"    
    style="margin-top: 8px" 
  >

    </webaudio-slider>
    <label id="label_4" style="font-size:12px; color:#eaac2f;margin-top:0px">0dB</label>
</div>

<div> 
    <webaudio-slider
    src="components/equalizer/hsliderbody.png"
    knobsrc="components/equalizer/hsliderknob.png"
    value=1
    min=-30
    max=30
    step=0.1
    basewidth=24
    baseheight=128
    knobwidth=24
    knobheight=24
    ditchlength=100
    tooltip="equalizer6"    
    id="equalizer6"    
    style="margin-top: 8px" 
  >
    </webaudio-slider>
    <label id="label_5" style="font-size:12px; color:#eaac2f;margin-top:0px">0dB</label>
</div>
    </div>
    </div>`
   ;

class Equalizer extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.filters = [];
  }

  connectedCallback() {
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.equalizer1 = this.shadowRoot.querySelector("#equalizer1");
    this.equalizer2 = this.shadowRoot.querySelector("#equalizer2");
    this.equalizer3 = this.shadowRoot.querySelector("#equalizer3");
    this.equalizer4 = this.shadowRoot.querySelector("#equalizer4");
    this.equalizer5 = this.shadowRoot.querySelector("#equalizer5");
    this.equalizer6 = this.shadowRoot.querySelector("#equalizer6");
    this.initmyequalizer();
    this.setListeners();
  }
  initmyequalizer() {
    const interval = setInterval(() => {
      if (this.audioContext) {
        [60, 170, 350, 1000, 3500, 10000].forEach((freq, i) => {
          const eq = this.audioContext.createBiquadFilter();
          eq.frequency.value = freq;
          eq.type = "peaking";
          eq.gain.value = 0;
          this.filters.push(eq);
        });

        this.filters.forEach((filter) => {
          this.addAudioNode(filter);
        });

        clearInterval(interval);
      }
    }, 500);
  }

  changeGain(nbFilter, sliderVal) {
    this.filters[nbFilter].gain.value = parseFloat(sliderVal);

    const output = this.shadowRoot.getElementById("label_" + nbFilter);
    output.innerHTML = parseFloat(sliderVal).toFixed(2) + " dB";
  }

  setListeners() {
    this.equalizer1.addEventListener("input", ({ target: { value } }) => {
      this.changeGain(0, value);
    });
    this.equalizer2.addEventListener("input", ({ target: { value } }) => {
      this.changeGain(1, value);
    });
    this.equalizer3.addEventListener("input", ({ target: { value } }) => {
      this.changeGain(2, value);
    });
    this.equalizer4.addEventListener("input", ({ target: { value } }) => {
      this.changeGain(3, value);
    });
    this.equalizer5.addEventListener("input", ({ target: { value } }) => {
      this.changeGain(4, value);
    } );
    this.equalizer6.addEventListener("input", ({ target: { value } }) => {
      this.changeGain(5, value);
    } );
  }
}

customElements.define("my-equalizer", Equalizer);
