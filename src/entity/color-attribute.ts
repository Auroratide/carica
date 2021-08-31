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

    static isColor(attr: Attr) {
        return attr.name.startsWith(ColorAttribute.PREFIX)
    }

    static fromAttribute(elem: Element, attr: Attr) {
        return new ColorAttribute(elem, attr.name.substring(ColorAttribute.PREFIX.length))
    }
}
