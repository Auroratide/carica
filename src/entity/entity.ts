import type { CaricaSource } from '../internal/source/CaricaSource'
import { ColorAttribute } from './color-attribute'
import { ExternalSource } from '../internal/source/ExternalSource'
import { divideIntoLayers } from '../internal/source/middleware/divide-into-layers'
import { assignFill } from '../internal/source/middleware/assign-fill'
import { ElementInternals, attachInternals } from '../internal/accessibility/element-internals'
import { LoadEvent } from '../events/load'

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
            position: relative;
        }

        #layers > * {
            position: absolute;
        }
    `

    private _source: CaricaSource | null = null
    private internals: ElementInternals

    protected elements = {
        container: () => this.shadowRoot?.getElementById('container'),
        layers: () => this.shadowRoot?.getElementById('layers')
    }

    constructor() {
        super()
        this.internals = attachInternals(this)
        this.createRoot()
    }

    connectedCallback() {
        this.setAllColors()
        this.setAccessibilityTraits()
        this.loadSource()
    }

    static get observedAttributes(): string[] {
        return ['src']
    }

    attributeChangedCallback(attr: string, oldValue: string, newValue: string) {
        if (attr === 'src') {
            this.source = new ExternalSource(newValue)
        }
    }

    get alt(): string { return this.getAttribute('alt') ?? '' }
    set alt(value: string) { this.setAttribute('alt', value) }

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
        if (this.isConnected)
                this.loadSource()
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

    private loadSource = () => {
        return this.source?.get()
            .then(assignFill)
            .then(divideIntoLayers)
            .then(this.attachLayers)
            .then(this.finishLoading)
    }

    private attachLayers = (layers: DocumentFragment) => {
        const parent = this.elements.layers()
        while (parent?.hasChildNodes())
            parent.removeChild(parent.lastChild!)
        parent?.appendChild(layers)
    }

    private finishLoading = () => {
        this.dispatchEvent(new LoadEvent())
    }

    private setAllColors = () => {
        const container = this.elements.container()
        Object.values(this.getAllColors()).forEach(color => {
            container?.style.setProperty(`--${color.name}_color`, color.get())
        })
    }

    private setAccessibilityTraits = () => {
        if (!this.getAttribute('role')) {
            this.setAttribute('role', 'img')
        }

        if (!this.getAttribute('aria-label')) {
            this.internals.ariaLabel = this.alt
        }
    }
}
