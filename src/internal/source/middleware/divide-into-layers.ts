import type { SourceMiddleware } from './SourceMiddleware'

/**
 * Expected format:
 * 
 * <svg>
 *   <g carica:layer="1"></g>
 *   <g carica:layer="2"></g>
 * </svg>
 */
export const divideIntoLayers: SourceMiddleware = (fragment) => {
    const result = document.createDocumentFragment()

    Array.from(fragment.children).forEach(svg => {
        Array.from(svg.children).forEach(layer => {
            const svgLayer = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
            svgLayer.setAttribute('viewBox', svg.getAttribute('viewBox') ?? '')
            svgLayer.style.zIndex = getLayerValue(layer)
            
            svgLayer.appendChild(layer)

            result.appendChild(svgLayer)
        })
    })

    return result
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
