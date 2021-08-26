import { html, fixture, expect } from '@open-wc/testing'
import { divideIntoLayers } from './divide-into-layers'

describe('divideIntoLayers', () => {
    it('empty input', () => {
        const result = divideIntoLayers(document.createDocumentFragment()).children

        expect(result).to.be.empty
    })

    it('empty svg', async () => {
        const svg = await fixture<SVGSVGElement>(html`
            <svg viewBox="0 0 2 1"></svg>
        `)

        const fragment = document.createDocumentFragment()
        fragment.appendChild(svg)

        const result = divideIntoLayers(fragment).children

        expect(result).to.be.empty
    })

    it('svg with named layers', async () => {
        const svg = await fixture<SVGSVGElement>(html`
            <svg viewBox="0 0 1 2">
                <g carica:layer="something"></g>
                <g carica:layer="else"></g>
                <path carica:layer="something" d="" />
            </svg>
        `)

        const fragment = document.createDocumentFragment()
        fragment.appendChild(svg)

        const result = divideIntoLayers(fragment).children

        expect(result).to.have.length(3)
        expect(result[0].getAttribute('viewBox')).to.equal('0 0 1 2')
        expect((result[0] as SVGElement).style.zIndex).to.equal('var(--something_layer)')
        expect(result[1].getAttribute('viewBox')).to.equal('0 0 1 2')
        expect((result[1] as SVGElement).style.zIndex).to.equal('var(--else_layer)')
        expect(result[2].getAttribute('viewBox')).to.equal('0 0 1 2')
        expect((result[2] as SVGElement).style.zIndex).to.equal('var(--something_layer)')
    })

    it('svg with anonymous layers', async () => {
        const svg = await fixture<SVGSVGElement>(html`
            <svg viewBox="0 0 1 2">
                <g carica:layer="2"></g>
            </svg>
        `)

        const fragment = document.createDocumentFragment()
        fragment.appendChild(svg)

        const result = divideIntoLayers(fragment).children

        expect(result).to.have.length(1)
        expect((result[0] as SVGElement).style.zIndex).to.equal('2')
    })

    it('svg with undefined layers', async () => {
        const svg = await fixture<SVGSVGElement>(html`
            <svg viewBox="0 0 1 2">
                <g></g>
                <g carica:layer="3"></g>
            </svg>
        `)

        const fragment = document.createDocumentFragment()
        fragment.appendChild(svg)

        const result = divideIntoLayers(fragment).children

        expect(result).to.have.length(2)
        expect((result[1] as SVGElement).style.zIndex).to.equal('3')
    })

    it('svg with layers that are not direct children', async () => {
        const svg = await fixture<SVGSVGElement>(html`
            <svg viewBox="0 0 1 2">
                <g>
                    <g carica:layer="2"></g>
                </g>
            </svg>
        `)

        const fragment = document.createDocumentFragment()
        fragment.appendChild(svg)

        const result = divideIntoLayers(fragment).children

        // Only direct children can be layers
        expect(result).to.have.length(1)
        expect((result[0] as SVGElement).style.zIndex).to.equal('')
    })
})
