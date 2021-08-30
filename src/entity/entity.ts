import type { CaricaSource } from '../internal/source/CaricaSource'
import { ExternalSource } from '../internal/source/ExternalSource'
import { divideIntoLayers } from '../internal/source/middleware/divide-into-layers'
import { assignFill } from '../internal/source/middleware/assign-fill'

export class CaricaEntity extends HTMLElement {
    static elementName = 'carica-entity'

    static html = `
        <div id="layers"></div>
        <slot></slot>
    `

    static css = `
        :host {
            display: inline-block;
        }

        #layers > * {
            position: absolute;
        }
    `

    private _source: CaricaSource | null = null

    constructor() {
        super()
        this.createRoot()
    }

    connectedCallback() {
        this.source?.get()
            .then(assignFill)
            .then(divideIntoLayers)
            .then(this.attachLayers.bind(this))
    }

    get src(): string { return this.getAttribute('src') ?? '' }
    set src(value: string | null) {
        if (value === null) {
            this.removeAttribute('src')
            this.source = null
        } else {
            this.setAttribute('src', value)
            this.source = new ExternalSource(value)
        }
    }

    get source(): CaricaSource | null {
        return this._source ?? (this.src ? new ExternalSource(this.src) : null)
    }
    set source(value: CaricaSource | null) {
        this._source = value
    }

    private createRoot(): ShadowRoot {
        const root = this.shadowRoot ?? this.attachShadow({ mode: 'open' })

        const style = document.createElement('style')
        style.innerHTML = (this.constructor as typeof CaricaEntity).css

        const template = document.createElement('template')
        template.innerHTML = (this.constructor as typeof CaricaEntity).html

        root.appendChild(style)
        root.appendChild(template.content)

        return root
    }

    private attachLayers(layers: DocumentFragment) {
        this.shadowRoot?.getElementById('layers')?.appendChild(layers)
    }
}
