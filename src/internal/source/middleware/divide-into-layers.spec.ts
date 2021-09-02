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

    describe('svg with named layers', () => {
        let fragment: DocumentFragment

        beforeEach(async () => {
            const svg = await fixture<SVGSVGElement>(html`
                <svg id="an-id" viewBox="0 0 1 2" xmlns="http://www.w3.org/2000/svg" xmlns:carica="https://auroratide.com/carica">
                    <g carica:layer="something"></g>
                    <g part="existing-part" carica:layer="else"></g>
                    <path carica:layer="something" d="" />
                </svg>
            `)
    
            fragment = document.createDocumentFragment()
            fragment.appendChild(svg)
        })

        it('preserves svg attributes', async () => {
            const result = divideIntoLayers(fragment).children

            expect(result).to.have.length(3)

            expect(result[0].getAttribute('viewBox')).to.equal('0 0 1 2')
            expect(result[1].getAttribute('viewBox')).to.equal('0 0 1 2')
            expect(result[2].getAttribute('viewBox')).to.equal('0 0 1 2')

            expect(result[0].getAttribute('xmlns:carica')).to.equal('https://auroratide.com/carica')
            expect(result[1].getAttribute('xmlns:carica')).to.equal('https://auroratide.com/carica')
            expect(result[2].getAttribute('xmlns:carica')).to.equal('https://auroratide.com/carica')
        })

        it('does not preserve id', async () => {
            // ids must be unique, therefore it cannot be preserved
            const result = divideIntoLayers(fragment).children

            expect(result).to.have.length(3)

            expect(result[0].id).to.equal('')
            expect(result[1].id).to.equal('')
            expect(result[2].id).to.equal('')
        })

        it('preserves the viewbox', async () => {
            const result = divideIntoLayers(fragment).children

            expect(result).to.have.length(3)
            expect(result[0].getAttribute('viewBox')).to.equal('0 0 1 2')
            expect(result[1].getAttribute('viewBox')).to.equal('0 0 1 2')
            expect(result[2].getAttribute('viewBox')).to.equal('0 0 1 2')
        })

        it('applies z-index', async () => {
            const result = divideIntoLayers(fragment).children

            expect(result).to.have.length(3)
            expect((result[0] as SVGElement).style.zIndex).to.equal('var(--something_layer)')
            expect((result[1] as SVGElement).style.zIndex).to.equal('var(--else_layer)')
            expect((result[2] as SVGElement).style.zIndex).to.equal('var(--something_layer)')
        })

        it('applies parts', async () => {
            const result = divideIntoLayers(fragment).children

            expect(result).to.have.length(3)
            expect(result[0].getAttribute('part')).to.equal('something-layer')
            expect(result[1].getAttribute('part')).to.equal('existing-part else-layer')
            expect(result[2].getAttribute('part')).to.equal('something-layer')
        })
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
