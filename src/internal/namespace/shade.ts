import { Material } from './material'

export class Shade {
    static attributeName = 'carica:shade'

    readonly value: string
    readonly material: Material

    constructor(value: string, material: Material) {
        this.value = value.trim()
        this.material = material
    }

    fill = (defaultFill: string = '') => {
        if (this.material.value === Material.NONE.value) {
            return defaultFill
        }

        if (!this.value) {
            return this.material.fill(defaultFill)
        }

        return `var(--${this.material.value}-${this.firstValue()}_color, ${this.material.fill(defaultFill)})`
    }

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

    static NONE = new Shade('', Material.NONE)

    private firstValue = () => this.value.split(' ')[0]
}
