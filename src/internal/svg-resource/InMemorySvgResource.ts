import { SvgResource } from './SvgResource'

export class InMemorySvgResource implements SvgResource {
    private elements: {
        [url: string]: HTMLTemplateElement
    }

    constructor() {
        this.elements = {}
    }

    add(url: string, template: HTMLTemplateElement) {
        this.elements[url] = template
    }

    svg(url: string): Promise<SVGSVGElement> {
        return new Promise((resolve) => {
            this.validateStatus(url)
            this.validateType(url)

            resolve(this.elements[url]
                .content
                .firstElementChild
                ?.cloneNode(true) as SVGSVGElement)
        })
    }

    private validateStatus(url: string): void {
        if (!this.elements[url]) {
            throw new Error(`Not Found: ${url}`)
        }
    }
    
    private validateType(url: string): void {
        if (!url.endsWith('.svg')) {
            throw new Error(`Invalid Type for ${url}`)
        }
    }
}
