import { CaricaSource } from './CaricaSource'

const SVG_MIME = 'image/svg+xml'

export class ExternalSource implements CaricaSource {
    readonly url: string

    constructor(url: string) {
        this.url = url
    }

    get(): Promise<DocumentFragment> {
        return fetch(this.url)
            .then(res => {
                this.validateStatus(res)
                this.validateType(res)

                return res.text()
            }).then(content => {
                const fragment = document.createDocumentFragment()
                const parser = new DOMParser()
                const child = parser.parseFromString(content, SVG_MIME).firstChild
                if (child) {
                    fragment.appendChild(child)
                }

                return fragment
            })
    }

    private validateStatus(res: Response): void {
        if (res.status === 404) {
            throw new Error(`Not Found: ${this.url}`)
        } else if (res.status >= 400) {
            throw new Error(`Request Failed: ${this.url}`)
        }
    }
    
    private validateType(res: Response): void {
        const mimeType = res.headers.get('content-type')?.split(';')[0]?.trim()

        if (mimeType !== SVG_MIME) {
            throw new Error(`Invalid Type ${mimeType} for ${this.url}`)
        }
    }
}