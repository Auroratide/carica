/**
 * A color as defined on a {@link CaricaEntity}.
 */
export class ColorAttribute {
    private static PREFIX = 'color-'

    private elem: Element
    readonly name: string

    /**
     * @param elem The element on which the attribute is located
     * @param name The name of the color
     */
    constructor(elem: Element, name: string) {
        this.elem = elem
        this.name = name
    }

    /**
     * @returns {string} The value of the color
     */
    get(): string {
        return this.elem.getAttribute(`${ColorAttribute.PREFIX}${this.name}`) ?? ''
    }

    /**
     * @param value The value of the color
     */
    set(value: string) {
        this.elem.setAttribute(`${ColorAttribute.PREFIX}${this.name}`, value)
    }

    /**
     * Determines whether a full attribute name represents a color
     * @param name The full attribute name
     * @returns {boolean} Whether the attribute represents a color
     */
    static isColor(name: string): boolean {
        return name.startsWith(ColorAttribute.PREFIX)
    }

    /**
     * 
     * @param elem The element on which the attribute is located
     * @param name The full attribute name
     * @returns {ColorAttribute} An object representing the color
     */
    static fromAttributeName(elem: Element, name: string): ColorAttribute {
        return new ColorAttribute(elem, name.substring(ColorAttribute.PREFIX.length))
    }
}
