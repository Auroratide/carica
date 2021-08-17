const html = `
    <svg viewBox="0 0 79.2 97.92">
        <path
            d="m 59.8068,22.351945 c 5.220401,4.690001 7.299816,14.059021 6.600853,20.5743 -0.465979,4.343487 -2.152797,7.7173 -1.766698,10.314165 0.314801,2.117265 1.637572,3.854332 1.551055,4.487352 C 65.54772,62.442231 58.607324,67.806551 44.830963,69.175958 35.646691,70.088831 22.485956,65.909415 18.381912,59.912841 14.277975,53.916361 8.3362098,41.16104 11.686148,31.542949 15.03609,21.924909 20.872866,16.002611 33.060684,14.867304 45.248502,13.731996 51.976231,15.316995 59.8068,22.351945 Z"
            fill-rule="evenodd"
            fill="var(--carica-color_undefined)" />
    </svg>
    <slot></slot>
`

const css = `
    
`

const template = document.createElement('template')
template.innerHTML = `<style>${css}</style>${html}`

export class CaricaHead extends HTMLElement {
    static elementName = 'carica-head'

    constructor() {
        super()

        this
            .attachShadow({ mode: 'open' })
            .appendChild(template.content.cloneNode(true))
    }
}
