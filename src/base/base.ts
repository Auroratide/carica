const html = `
    <div>Hello world</div>
`

const css = `
    div {
        color: red;
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
}
