import { expect } from '@open-wc/testing'
import { Layer } from './layer'

describe('carica:layer', () => {
    describe('z-index', () => {
        it('numerical value', () => {
            const layer = new Layer('1')

            expect(layer.zIndex()).to.equal('1')
        })

        it('string value', () => {
            const layer = new Layer('head')

            expect(layer.zIndex()).to.equal('var(--head_layer)')
        })
    })

    describe('parts', () => {
        it('numerical value', () => {
            const layer = new Layer('1')

            expect(layer.parts()).to.deep.equal([])
        })

        it('string value', () => {
            const layer = new Layer('head')

            expect(layer.parts()).to.deep.equal(['head-layer'])
        })
    })

    describe('factory', () => {
        it('layer is defined', () => {
            const g = document.createElementNS('http://www.w3.org/2000/svg', 'g')
            g.setAttribute(Layer.attributeName, 'head')

            const layer = Layer.from(g)
            expect(layer!.value).to.equal('head')
        })

        it('layer not defined', () => {
            const g = document.createElementNS('http://www.w3.org/2000/svg', 'g')
            const layer = Layer.from(g)
            expect(layer).to.be.null
        })
    })

    describe('edge cases', () => {
        it('empty', () => {
            const layer = new Layer('')

            expect(layer.zIndex()).to.equal('')
            expect(layer.parts()).to.deep.equal([])
        })

        it('numerical value with whitespace', () => {
            const layer = new Layer(' 1 ')

            expect(layer.zIndex()).to.equal('1')
            expect(layer.parts()).to.deep.equal([])
        })

        it('string value with whitespace', () => {
            const layer = new Layer(' head ')

            expect(layer.zIndex()).to.equal('var(--head_layer)')
            expect(layer.parts()).to.deep.equal(['head-layer'])
        })

        it('multiple numeric values', () => {
            const layer = new Layer('1 2')

            // Only the first is chosen
            expect(layer.zIndex()).to.equal('1')
        })

        it('multiple string values', () => {
            const layer = new Layer('head body')

            // Only the first is chosen
            expect(layer.zIndex()).to.equal('var(--head_layer)')
            expect(layer.parts()).to.deep.equal(['head-layer'])
        })
    })
})