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
            fill="magenta" />
        <g carica:layer="ear">
            <path
                d="m 318.33883,729.36396 c 0,0 -60.78943,-33.31151 -91.23223,-73.11827 C 196.6638,616.43893 196.97553,555.3867 242.5,540 c 45.52447,-15.3867 108.44975,70.75736 108.44975,70.75736 -17.30519,32.03177 -34.40016,54.65785 -32.61092,118.6066 z"
                carica:material="skin"
                fill="magenta" />
            <path
                d="m 305.58277,706.16548 c -38.40002,-27.91697 -76.36463,-51.98925 -81.09129,-90.81435 -2.28034,-18.73082 -0.68988,-46.08668 26.56925,-50.57437 27.25914,-4.48769 71.56706,53.35184 71.56706,53.35184 -12.16287,22.87505 -19.83725,31.76804 -17.04502,88.03688 z"
                carica:material="skin"
                carica:shade="dark"
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
