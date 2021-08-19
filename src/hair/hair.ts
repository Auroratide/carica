const html = `
    <img alt="" />
    <slot></slot>
`

const css = `
    img {
        position: absolute;
    }
`

const template = document.createElement('template')
template.innerHTML = `<style>${css}</style>${html}`

export class CaricaHair extends HTMLElement {
    static elementName = 'carica-hair'

    constructor() {
        super()

        this
            .attachShadow({ mode: 'open' })
            .appendChild(template.content.cloneNode(true))
    }

    connectedCallback() {
        const img = this.shadowRoot?.querySelector('img')
        if (img) {
            img.src = this.src
        }
    }

    get src(): string { return this.getAttribute('src') ?? '' }
    set src(value: string | null) {
        if (value === null) {
            this.removeAttribute('src')
        } else {
            this.setAttribute('src', value)
        }
    }
}
