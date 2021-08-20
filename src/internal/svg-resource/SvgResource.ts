export interface SvgResource {
    svg(url: string): Promise<SVGSVGElement>
}
