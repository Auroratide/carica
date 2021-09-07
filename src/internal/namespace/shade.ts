import { Material } from './material'

/**
 * A name for a variation of a graphic's {@link Material}. This is mostly
 * used for relaying the colors of a material under in different contexts,
 * as as under different lighting conditions. For example, "dark" may be
 * considered a shade of a material when not in direct light.
 * 
 * Shades are defined on SVG elements by carica authors, providing a way to
 * customize the colors of an entity.
 * 
 * For a shade to have meaning, a material must also be defined on the shape.
 */
export class Shade {
    static attributeName = 'carica:shade'

    readonly value: string
    readonly material: Material

    constructor(value: string, material: Material) {
        this.value = value.trim()
        this.material = material
    }

    /**
     * Converts the shade into a fill value, which is a CSS variable.
     * @param defaultFill If material/shade is not specified, what color to use instead
     */
    fill = (defaultFill: string = '') => {
        if (this.material.value === Material.NONE.value) {
            return defaultFill
        }

        if (!this.value) {
            return this.material.fill(defaultFill)
        }

        return `var(--${this.material.value}-${this.firstValue()}_color, ${this.material.fill(defaultFill)})`
    }

    /**
     * A list of shadow-dom parts representing the material/shade.
     */
    parts = () => {
        if (this.material.value === Material.NONE.value) {
            return []
        }

        return this.material.parts().concat(this.value ? [this.firstValue()] : [])
    }

    static from(elem: SVGElement, fallback: Shade = Shade.NONE): Shade {
        const material = Material.from(elem) ?? fallback.material
        return new Shade(elem.getAttribute(this.attributeName) ?? fallback.value, material)
    }

    /**
     * Indicates the graphic has no material information.
     */
    static NONE = new Shade('', Material.NONE)

    private firstValue = () => this.value.split(' ')[0]
}
