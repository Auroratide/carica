const html = `
    <slot></slot>
`

const css = `
    :host {
        --carica-color_undefined: #ff00ff;

        --back_layer: 0;
        --afore-back_layer: 4;

        --behind-body_layer: 8;
        --body_layer: 12;
        --afore-body_layer: 16;

        --behind-head_layer: 20;
        --head_layer: 24;
        --afore-head_layer: 28;

        --behind-face_layer: 32;
        --face_layer: 36;
        --afore-face_layer: 40;

        --behind-front_layer: 44;
        --front_layer: 48;

        display: block;
        position: relative;
    }
`

const template = document.createElement('template')
template.innerHTML = `<style>${css}</style>${html}`

export class CaricaBase extends HTMLElement {
    static elementName = 'carica-base'

    constructor() {
        super()

        this
            .attachShadow({ mode: 'open' })
            .appendChild(template.content.cloneNode(true))
    }

    connectedCallback() {
        this.style.setProperty('--carica_skin-color', this.skin)
    }

    get skin(): string { return this.getAttribute('skin') ?? '' }
}
