const html = `
    <slot></slot>
`

const css = `
    :host {
        --carica-color_undefined: #ff00ff;

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
