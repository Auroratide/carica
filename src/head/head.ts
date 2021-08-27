import type { CaricaSource } from '../internal/source/CaricaSource'
import { CaricaEntity } from '../entity/entity'
import { StaticSource } from '../internal/source/StaticSource'

const defaultHead = document.createElement('template')
defaultHead.innerHTML = `
    <svg viewBox="0 0 1000 1000" xmlns:carica="https://auroratide.com/carica">
        <path
            carica:layer="head"
            carica:material="skin"
            d="m 537.44726,788.08901 c 152.16208,5.20081 265.19952,-72.51782 271.03439,-111.28005 2.95964,-19.66153 -9.09494,-36.02961 -8.59327,-67.20279 0.8949,-55.60482 48.21223,-182.02613 -4.01741,-274.66952 -52.22964,-92.6434 -122.41494,-145.54832 -272.45108,-150.67646 -150.03613,-5.12815 -264.44196,40.29305 -313.28632,170.52359 -48.84434,130.23054 8.12974,242.99963 35.47788,303.78433 27.34815,60.78471 139.67373,124.32009 291.83581,129.5209 z"
            fill="var(--carica_skin-color, var(--carica-color_undefined))" />
    </svg>
`

export class CaricaHead extends CaricaEntity {
    static elementName = 'carica-head'

    constructor() {
        super()
    }

    override get source(): CaricaSource {
        return super.source ?? new StaticSource(defaultHead)
    }
}
