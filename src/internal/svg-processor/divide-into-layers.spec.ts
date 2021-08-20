import { html, fixture, expect } from '@open-wc/testing'
import { divideIntoLayers } from './divide-into-layers'

describe('divideIntoLayers', () => {
    it('empty input', () => {
        expect(divideIntoLayers([])).to.be.empty
    })

    it('empty svg', async () => {
        const svg = await fixture<SVGSVGElement>(html`
            <svg viewBox="0 0 2 1"></svg>
        `)

        const result = divideIntoLayers([svg])

        expect(result).to.be.empty
    })

    it('svg with defined layers', async () => {
        const svg = await fixture<SVGSVGElement>(html`
            <svg viewBox="0 0 1 2">
                <g data-layer="2"></g>
                <g data-layer="1"></g>
                <path data-layer="3" d="" />
            </svg>
        `)

        const result = divideIntoLayers([svg])

        
        expect(result).to.have.length(3)
        expect(result[0].getAttribute('viewBox')).to.equal('0 0 1 2')
        expect(result[0].style.zIndex).to.equal('2')
        expect(result[1].getAttribute('viewBox')).to.equal('0 0 1 2')
        expect(result[1].style.zIndex).to.equal('1')
        expect(result[2].getAttribute('viewBox')).to.equal('0 0 1 2')
        expect(result[2].style.zIndex).to.equal('3')
    })

    it('svg with undefined layers', async () => {
        const svg = await fixture<SVGSVGElement>(html`
            <svg viewBox="0 0 1 2">
                <g></g>
                <g data-layer="3"></g>
            </svg>
        `)

        const result = divideIntoLayers([svg])

        expect(result).to.have.length(2)
        expect(result[1].style.zIndex).to.equal('3')
    })

    it('svg with layers that are not direct children', async () => {
        const svg = await fixture<SVGSVGElement>(html`
            <svg viewBox="0 0 1 2">
                <g>
                    <g data-layer="2"></g>
                </g>
            </svg>
        `)

        const result = divideIntoLayers([svg])

        // Only direct children can be layers
        expect(result).to.have.length(1)
        expect(result[0].style.zIndex).to.equal('')
    })
})
