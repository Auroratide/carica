export class ColorAttribute {
    private static PREFIX = 'color-'

    private elem: Element
    readonly name: string

    constructor(elem: Element, name: string) {
        this.elem = elem
        this.name = name
    }

    get(): string {
        return this.elem.getAttribute(`${ColorAttribute.PREFIX}${this.name}`) ?? ''
    }

    set(value: string) {
        this.elem.setAttribute(`${ColorAttribute.PREFIX}${this.name}`, value)
    }

    static isColor(name: string) {
        return name.startsWith(ColorAttribute.PREFIX)
    }

    static fromAttributeName(elem: Element, name: string) {
        return new ColorAttribute(elem, name.substring(ColorAttribute.PREFIX.length))
    }
}
