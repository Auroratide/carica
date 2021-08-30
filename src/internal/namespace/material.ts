export class Material {
    static attributeName = 'carica:material'

    readonly value: string

    constructor(value: string) {
        this.value = value.trim()
    }

    fill = (defaultFill: string = '') => {
        if (this.value) {
            return `var(--${this.firstValue()}_color${defaultFill ? ', ' : ''}${defaultFill})`
        } else {
            return defaultFill
        }
    }

    static from(elem: SVGElement): Material | null {
        if (elem.hasAttribute(this.attributeName)) {
            return new Material(elem.getAttribute(this.attributeName)!)
        } else {
            return null
        }
    }

    static NONE = new Material('')

    private firstValue = () => this.value.split(' ')[0]
}
