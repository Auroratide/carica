import { CaricaSource } from './CaricaSource'

/**
 * Represents a graphic defined inline. Can be used for testing or for default
 * graphics on entities that do not specifiy an external source.
 */
export class StaticSource implements CaricaSource {
    private template: HTMLTemplateElement

    constructor(template: HTMLTemplateElement) {
        this.template = template
    }

    get(): Promise<DocumentFragment> {
        return Promise.resolve(this.template.content.cloneNode(true) as DocumentFragment)
    }
}
