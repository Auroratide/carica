import type { CaricaSource } from '../internal/source/CaricaSource'
import { CaricaEntity } from '../entity/entity'
import { StaticSource } from '../internal/source/StaticSource'

const defaultHead = document.createElement('template')
defaultHead.innerHTML = `
    <svg viewBox="0 0 1200 1200" xmlns:carica="https://auroratide.com/carica">
        <path
            carica:layer="head"
            carica:material="skin"
            d="M644.938 945.707c182.593 6.242 318.238-87.023 325.242-133.535 3.55-23.594-10.914-43.238-10.313-80.645 1.074-66.726 57.856-218.43-4.82-329.601-62.676-111.176-146.899-174.66-326.942-180.813-180.046-6.156-317.332 48.352-375.945 204.63-58.613 156.273 9.754 291.597 42.574 364.538 32.817 72.942 167.61 149.184 350.204 155.426zm0 0"
            fill="magenta" />
        <g carica:layer="ear">
            <path
                carica:material="skin"
                d="M382.008 875.238s-72.95-39.976-109.48-87.742C235.995 739.726 236.37 666.465 291 648c54.629-18.465 130.14 84.91 130.14 84.91-20.765 38.438-41.28 65.59-39.132 142.328Zm0 0"
                fill="magenta" />
            <path
                carica:shade="dark"
                carica:material="skin"
                d="M366.7 847.398c-46.079-33.5-91.637-62.386-97.31-108.976-2.738-22.477-.827-55.305 31.883-60.692 32.711-5.382 85.88 64.024 85.88 64.024-14.594 27.45-23.805 38.121-20.454 105.644zm0 0"
                fill="darkmagenta" />
        </g>
    </svg>
`

/**
 * Represents the head of a character and all its facial features.
 */
export class CaricaHead extends CaricaEntity {
    static elementName = 'carica-head'

    constructor() {
        super()
    }

    override get source(): CaricaSource {
        return super.source ?? new StaticSource(defaultHead)
    }
}
