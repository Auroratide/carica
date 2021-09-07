/**
 * Represents the depth of a graphic relative to other graphics composing a
 * carica entity.
 * 
 * Layers are usually named, with the names being specified as either
 * standard layers on an entity or custom-defined. Layers may also be
 * numerical, with lower values being rendered behind higher values.
 */
export class Layer {
    static attributeName = 'carica:layer'

    readonly value: string

    constructor(value: string) {
        this.value = value.trim()
    }

    /**
     * Converts the layer into a z-index value. If the layer is named, a CSS
     * variable is returned.
     */
    zIndex = () => this.isNumericOrEmpty()
        ? this.firstValue()
        : `var(--${this.firstValue()}_layer)`

    /**
     * A list of shadow-dom parts representing the layer.
     */
    parts = () => this.isNumericOrEmpty()
        ? []
        : [`${this.firstValue()}-layer`]

    static from(elem: SVGElement): Layer | null {
        if (elem.hasAttribute(this.attributeName)) {
            return new Layer(elem.getAttribute(this.attributeName)!)
        } else {
            return null
        }
    }

    private isNumericOrEmpty = () => /^[\d\s]*$/.test(this.value)
    private firstValue = () => this.value.split(' ')[0]
}
