export class Layer {
    static attributeName = 'carica:layer'

    readonly value: string

    constructor(value: string) {
        this.value = value.trim()
    }

    zIndex = () => this.isNumericOrEmpty()
        ? this.firstValue()
        : `var(--${this.firstValue()}_layer)`

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
