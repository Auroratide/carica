import { ColorAttribute } from "./color-attribute";

/**
 * Observes whether a color attribute has changed on the given element
 * and reacts to it.
 */
export class ColorObserver extends MutationObserver {
    private elem: Element

    /**
     * @param elem The element to observe
     * @param onColorChange Action to take when a color changes
     */
    constructor(elem: Element, onColorChange: (color: ColorAttribute) => void) {
        super((mutations: MutationRecord[]) => {
            for (const mutation of mutations) {
                if (mutation.type === 'attributes' && ColorAttribute.isColor(mutation.attributeName!)) {
                    onColorChange(ColorAttribute.fromAttributeName(elem, mutation.attributeName!))
                }
            }
        })
        this.elem = elem
    }

    override observe() {
        super.observe(this.elem, { attributes: true })
    }
}