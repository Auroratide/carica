const html = `
    <svg viewBox="0 0 1000 1000">
        <path
            d="m 548.83027,786.52649 c 152.25093,0 262.56758,-81.53457 267.07494,-120.4735 2.28629,-19.75116 -10.32038,-35.6979 -10.88386,-66.87003 -1.00509,-55.60293 41.96617,-183.5668 -13.39764,-274.37199 -55.36381,-90.80519 -127.31535,-141.28174 -277.4391,-141.28174 -150.12374,0 -262.91125,49.30274 -307.27848,181.12577 -44.36723,131.82303 16.42572,242.58011 45.83428,302.39514 29.40856,59.81503 143.83893,119.47635 296.08986,119.47635 z"
            fill="var(--carica_skin-color, var(--carica-color_undefined))" />
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
