import { CaricaSource } from './CaricaSource'

export class StaticSource implements CaricaSource {
    private template: HTMLTemplateElement

    constructor(template: HTMLTemplateElement) {
        this.template = template
    }

    get(): Promise<DocumentFragment> {
        return Promise.resolve(this.template.content)
    }
}
