export class PartList {
    private elem: Element

    constructor(elem: Element) {
        this.elem = elem
    }

    add = (...names: string[]) => {
        const tokens = this.tokens()
        names.forEach(n => tokens.add(n))
        this.set(tokens)
    }

    values = () => Array.from(this.tokens())

    static of(elem: Element): PartList {
        return new PartList(elem)
    }

    private tokens = () => new Set(this.elem.getAttribute('part')?.split(' '))
    private set = (tokens: Set<string>) => {
        this.elem.setAttribute('part', Array.from(tokens).join(' '))
    }
}
