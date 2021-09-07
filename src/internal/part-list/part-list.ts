/**
 * Represents the `part` attribute on elements in the shadow dom. This is
 * analogous to the classList attribute.
 * 
 * Usage:
 * ```typescript
 * const parts = PartList.of(element)
 * ```
 */
export class PartList {
    private elem: Element

    constructor(elem: Element) {
        this.elem = elem
    }

    /**
     * Adds parts to the element's part list. Duplicate tokens are de-duped
     * in the final token list.
     * @param names Tokens to add to the list of parts
     */
    add = (...names: string[]) => {
        const tokens = this.tokens()
        names.forEach(n => tokens.add(n))
        this.set(tokens)
    }

    /**
     * @returns List of all tokens as an iterable
     */
    values = () => Array.from(this.tokens())

    static of(elem: Element): PartList {
        return new PartList(elem)
    }

    private tokens = () => new Set(this.elem.getAttribute('part')?.split(' '))
    private set = (tokens: Set<string>) => {
        this.elem.setAttribute('part', Array.from(tokens).join(' '))
    }
}
