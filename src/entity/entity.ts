import type { CaricaSource } from '../internal/source/CaricaSource'
import { ColorAttribute } from './color-attribute'
import { ExternalSource } from '../internal/source/ExternalSource'
import { divideIntoLayers } from '../internal/source/middleware/divide-into-layers'
import { assignFill } from '../internal/source/middleware/assign-fill'

export class CaricaEntity extends HTMLElement {
    static elementName = 'carica-entity'

    static html = `
        <div id="container">
            <div id="layers"></div>
            <slot></slot>
        </div>
    `

    static css = `
        :host {
            display: block;
        }

        #layers > * {
            position: absolute;
        }
    `

    private _source: CaricaSource | null = null

    protected elements = {
        container: () => this.shadowRoot?.getElementById('container'),
        layers: () => this.shadowRoot?.getElementById('layers')
    }

    constructor() {
        super()
        this.createRoot()
    }

    connectedCallback() {
        this.setAllColors()

        this.source?.get()
            .then(assignFill)
            .then(divideIntoLayers)
            .then(this.attachLayers)
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

    getAllColors(): { [name: string]: ColorAttribute } {
        const result: { [name: string]: ColorAttribute } = {}
        const attrs = this.attributes
        for (let i = 0; i < attrs.length; ++i) {
            const attr = attrs[i]
            if (ColorAttribute.isColor(attr)) {
                const color = ColorAttribute.fromAttribute(this, attr)
                result[color.name] = color
            }
        }

        return result
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

    private attachLayers = (layers: DocumentFragment) => {
        this.elements.layers()?.appendChild(layers)
    }

    private setAllColors = () => {
        const container = this.elements.container()
        Object.values(this.getAllColors()).forEach(color => {
            container?.style.setProperty(`--${color.name}_color`, color.get())
        })
    }
}
