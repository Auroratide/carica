export const divideIntoLayers: (elements: SVGSVGElement[]) => SVGSVGElement[] = (elements) => {
    return elements.flatMap((svg) => {
        return Array.from(svg.children).map((layer) => {
            const svgLayer = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
            svgLayer.setAttribute('viewBox', svg.getAttribute('viewBox') ?? '')
            svgLayer.style.zIndex = getLayerValue(layer)
            
            svgLayer.appendChild(layer)

            return svgLayer
        })
    })
}

const getLayerValue: (layer: Element) => string = (layer) => {
    const value = layer.getAttribute('carica:layer') ?? ''

    // empty or a number
    if (/^\s*\d*\s*$/.test(value)) {
        return value
    } else {
        return `var(--${value}_layer)`
    }
}
