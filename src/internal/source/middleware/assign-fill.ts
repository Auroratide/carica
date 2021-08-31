import type { SourceMiddleware } from './SourceMiddleware'
import { Shade } from '../../namespace/shade'
import { PartList } from '../../part-list'

/**
 * <svg>
 *   <path
 *     carica:material="hair"
 *     carica:shade="dark"
 *     fill="#f00" />
 * </svg>
 *
 * ...becomes...
 * 
 * <svg>
 *   <path
 *     carica:material="hair"
 *     carica:shade="dark"
 *     part="hair dark"
 *     fill="var(--hair-dark_fill, var(--hair_fill, #f00))" />
 * </svg>
 */
export const assignFill: SourceMiddleware = (fragment) => {
    Array.from(fragment.children).forEach(elem => setChildFills(elem as SVGElement, null))

    return fragment
}

const setChildFills = (elem: SVGElement, parentShade: Shade | null) => {
    const shade = Shade.from(elem, parentShade ?? Shade.NONE)
    const fill = elem.style.fill.length > 0 ? elem.style.fill : elem.getAttribute('fill')

    if (fill) {
        elem.style.fill = shade.fill(fill)
        PartList.of(elem).add(...shade.parts())
    }

    Array.from(elem.children).forEach(child => setChildFills(child as SVGElement, shade))
}
