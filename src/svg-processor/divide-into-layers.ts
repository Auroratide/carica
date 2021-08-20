export const divideIntoLayers: (elements: SVGSVGElement[]) => SVGSVGElement[] = (elements) => {
    return elements.flatMap((svg) => {
        return Array.from(svg.children).map((layer) => {
            const svgLayer = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
            svgLayer.setAttribute('viewBox', svg.getAttribute('viewBox') ?? '')
            svgLayer.style.zIndex = layer.getAttribute('data-layer') ?? ''
            
            svgLayer.appendChild(layer)

            return svgLayer
        })
    })
}
