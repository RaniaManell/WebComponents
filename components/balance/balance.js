import "../../lib/webaudio-controls.js";

///Pour ce composant, nous nous sommes basées sur le TP de Dorian pour définir la balance
const template = document.createElement("template");
template.innerHTML =  `
    <style>
    webaudio-knob {
      --webaudio-knob-size: 100px;
      --webaudio-knob-rotation: 270deg;

    }
    .balance {
      display: grid;
      column-gap: 10px;
    color: white;

    }
    </style>
    <webaudio-knob
        id="balance"
        value=0
        min=-1
        max=1
        src="components/balance/Vintage_Knob.png"
        step=0.1
        diameter=60
        tooltip="Balance"
    >
    </webaudio-knob>
`;

class Balance extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.filters = [];
  }

  connectedCallback() {
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.balance = this.shadowRoot.getElementById("balance");
    const interval = setInterval(() => {
      if (this.audioContext) {
        this.pannerNode = this.audioContext.createStereoPanner();
        this.addAudioNode(this.pannerNode);
        clearInterval(interval);
      }
    }, 500);

    this.balance.addEventListener("input", ({ target: { value } }) => {
      if (this.pannerNode) {
        this.pannerNode.pan.value = parseFloat(value, 10);
      }
    });
  }
}

customElements.define("my-balance", Balance);
