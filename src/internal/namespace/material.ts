/**
 * A name given to what a shape on a graphic is made of. This is mostly used
 * for relaying the colors of entities or sub-entities. For example, "hair"
 * can be considered a material.
 * 
 * Materials are defined on SVG elements by carica authors, providing a way to
 * customize the colors of an entity. This is often paired with {@link Shade},
 * which indicates a variation on a material.
 */
export class Material {
    static attributeName = 'carica:material'

    readonly value: string

    constructor(value: string) {
        this.value = value.trim()
    }

    /**
     * Converts the material into a fill value, which is a CSS variable.
     * @param defaultFill If material is not specified, what color to use instead
     */
    fill = (defaultFill: string = '') => {
        if (this.value) {
            return `var(--color-${this.firstValue()}${defaultFill ? ', ' : ''}${defaultFill})`
        } else {
            return defaultFill
        }
    }

    /**
     * A list of shadow-dom parts representing the material.
     */
    parts = () => this.value ? [this.firstValue()] : []

    static from(elem: SVGElement): Material | null {
        if (elem.hasAttribute(this.attributeName)) {
            return new Material(elem.getAttribute(this.attributeName)!)
        } else {
            return null
        }
    }

    /**
     * Indicates the graphic has no material information.
     */
    static NONE = new Material('')

    private firstValue = () => this.value.split(' ')[0]
}
