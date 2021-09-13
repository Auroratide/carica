import type { CaricaSource } from '../internal/source/CaricaSource'
import { ColorAttribute } from './color-attribute'
import { ExternalSource } from '../internal/source/ExternalSource'
import { divideIntoLayers } from '../internal/source/middleware/divide-into-layers'
import { assignFill } from '../internal/source/middleware/assign-fill'
import { ElementInternals, attachInternals } from '../internal/accessibility/element-internals'
import { LoadEvent } from '../events/load'
import { ColorObserver } from './color-observer'

/**
 * A visible object on a scene. Entities have physical properties such as
 * size, color, and position. This class is the base of many different
 * carica elements.
 * 
 * By default, entities are treated the same as images for the sake of
 * accessibility. This can be overridden by defining an aria role on the
 * element.
 */
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

        svg {
            overflow: visible;
        }
    `

    private _source: CaricaSource | null = null
    private internals: ElementInternals
    private colorObserver: ColorObserver

    protected elements = {
        container: () => this.shadowRoot?.getElementById('container'),
        layers: () => this.shadowRoot?.getElementById('layers')
    }

    constructor() {
        super()
        this.internals = attachInternals(this)
        this.colorObserver = new ColorObserver(this, this.setOneColor)
        this.createRoot()
    }

    connectedCallback() {
        this.setAllColors()
        this.setAccessibilityTraits()
        this.colorObserver.observe()
        this.loadSource()
    }

    disconnectedCallback() {
        this.colorObserver.disconnect()
    }

    static get observedAttributes(): string[] {
        return ['src', 'alt']
    }

    attributeChangedCallback(attr: string, oldValue: string, newValue: string) {
        if (attr === 'src') {
            this.source = new ExternalSource(newValue)
        } else if (attr === 'alt') {
            if (!this.internals.ariaLabel || this.internals.ariaLabel === oldValue)
                this.internals.ariaLabel = newValue
        }
    }

    /**
     * The accessible text for the entity. Treat this the same as alt text
     * on an image.
     */
    get alt(): string { return this.getAttribute('alt') ?? '' }
    set alt(value: string) { this.setAttribute('alt', value) }

    /**
     * The source url for a graphic representing this entity. See
     * {@link CaricaEntity.source} for more.
     */
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

    /**
     * The source graphic to show for this entity. It is fetched when the
     * entity is connected to a document and displayed when ready. Entities
     * do not need to specify a source, indicating they may be composed of
     * child entities instead.
     */
    get source(): CaricaSource | null {
        return this._source ?? (this.src ? new ExternalSource(this.src) : null)
    }
    set source(value: CaricaSource | null) {
        this._source = value
        if (this.isConnected)
                this.loadSource()
    }

    /**
     * @param name Name of the color
     */
    color(name: string): ColorAttribute {
        return new ColorAttribute(this, name)
    }

    /**
     * @returns A hash map of all colors defined on this entity
     */
    getAllColors(): { [name: string]: ColorAttribute } {
        const result: { [name: string]: ColorAttribute } = {}
        const attrs = this.attributes
        for (let i = 0; i < attrs.length; ++i) {
            const attr = attrs[i]
            if (ColorAttribute.isColor(attr.name)) {
                const color = ColorAttribute.fromAttributeName(this, attr.name)
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
        Object.values(this.getAllColors()).forEach(color => this.setOneColor(color, container))
    }

    private setOneColor = (color: ColorAttribute, container?: HTMLElement | null) => {
        (container ?? this.elements.container())?.style.setProperty(`--color-${color.name}`, color.get())
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
