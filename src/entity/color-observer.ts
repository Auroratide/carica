import { ColorAttribute } from "./color-attribute";

export class ColorObserver extends MutationObserver {
    private elem: Element

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