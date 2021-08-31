import type { SourceMiddleware } from './SourceMiddleware'
import { Layer } from '../../namespace/layer'
import { PartList } from '../../part-list'

/**
 * <svg>
 *   <g carica:layer="top"></g>
 *   <g carica:layer="bottom"></g>
 * </svg>
 *
 * ...becomes...
 *
 * <svg part="top-layer" style="z-index: var(--top_layer);">
 *   <g carica:layer="top"></g>
 * </svg>
 * <svg part="bottom-layer" style="z-index: var(--bottom_layer);">
 *   <g carica:layer="bottom"></g>
 * </svg>
 */
export const divideIntoLayers: SourceMiddleware = (fragment) => {
    const result = document.createDocumentFragment()

    Array.from(fragment.children).forEach(svg => {
        Array.from(svg.children).forEach(layerElem => {
            const layer = Layer.from(layerElem as SVGElement)

            const svgLayer = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
            svgLayer.setAttribute('viewBox', svg.getAttribute('viewBox') ?? '')
            svgLayer.style.zIndex = layer?.zIndex() ?? ''
            PartList.of(svgLayer).add(...PartList.of(layerElem).values(), ...(layer?.parts() ?? []))
            
            svgLayer.appendChild(layerElem)

            result.appendChild(svgLayer)
        })
    })

    return result
}
