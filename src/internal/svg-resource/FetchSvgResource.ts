import { SvgResource } from './SvgResource'

const SVG_MIME = 'image/svg+xml'

export class FetchSvgResource implements SvgResource {
    private fetch: (request: RequestInfo) => Promise<Response>

    constructor(fetchFn: (request: RequestInfo) => Promise<Response> = fetch) {
        this.fetch = fetchFn.bind(window)
    }

    svg(url: string): Promise<SVGSVGElement> {
        return this.fetch(url)
            .then(res => {
                this.validateStatus(res, url)
                this.validateType(res, url)

                return res.text()
            }).then(content => {
                const parser = new DOMParser()
                return parser.parseFromString(content, SVG_MIME).firstChild as SVGSVGElement
            })
    }

    private validateStatus(res: Response, url: string): void {
        if (res.status === 404) {
            throw new Error(`Not Found: ${url}`)
        } else if (res.status >= 400) {
            throw new Error(`Request Failed: ${url}`)
        }
    }
    
    private validateType(res: Response, url: string): void {
        const mimeType = res.headers.get('content-type')?.split(';')[0]?.trim()

        if (mimeType !== SVG_MIME) {
            throw new Error(`Invalid Type ${mimeType} for ${url}`)
        }
    }
}