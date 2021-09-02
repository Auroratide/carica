import { ARIAMixin } from './aria-mixin'

/**
 * https://html.spec.whatwg.org/#elementinternals
 */
export interface ElementInternals extends ARIAMixin { }

/**
 * Cheap polyfill of ElementInternals
 */
export class InlineElementInternals implements ElementInternals {
    private elem: Element
    
    constructor(elem: Element) {
        this.elem = elem
    }

    get ariaLabel(): string | null { return this.elem.getAttribute('aria-label') }
    set ariaLabel(value: string | null) {
        if (value !== null) {
            this.elem.setAttribute('aria-label', value)
        } else {
            this.elem.removeAttribute('aria-label')
        }
    }
}

/**
 * https://caniuse.com/mdn-api_elementinternals
 */
export const attachInternals: (elem: HTMLElement) => ElementInternals = (elem) => {
    // Does not seem to work consistently across different ATs
    // Works for VoiceOver, not so much for NVDA
    // if ('ElementInternals' in window) {
    //     return (elem as any).attachInternals()
    // }
    
    return new InlineElementInternals(elem)
}
