import { expect } from '@open-wc/testing'
import { Material } from './material'

describe('carica:material', () => {
    describe('fill', () => {
        it('default not provided', () => {
            const material = new Material('hair')

            expect(material.fill()).to.equal('var(--hair_color)')
        })

        it('default provided', () => {
            const material = new Material('hair')

            expect(material.fill('red')).to.equal('var(--hair_color, red)')
        })
    })

    it('parts', () => {
        const material = new Material('hair')

        expect(material.parts()).to.deep.equal(['hair'])
    })

    describe('factory', () => {
        it('material is defined', () => {
            const elem = document.createElementNS('http://www.w3.org/2000/svg', 'path')
            elem.setAttribute(Material.attributeName, 'hair')

            const material = Material.from(elem)
            expect(material!.value).to.equal('hair')
        })

        it('material not defined', () => {
            const elem = document.createElementNS('http://www.w3.org/2000/svg', 'path')
            const material = Material.from(elem)
            expect(material).to.be.null
        })
    })

    describe('edge cases', () => {
        it('empty', () => {
            const material = new Material('')

            expect(material.fill()).to.equal('')
            expect(material.fill('red')).to.equal('red')
            expect(material.parts()).to.deep.equal([])
        })

        it('has whitespace', () => {
            const material = new Material(' hair ')

            expect(material.fill()).to.equal('var(--hair_color)')
            expect(material.parts()).to.deep.equal(['hair'])
        })

        it('multiple values', () => {
            const material = new Material('hair iris')

            // Only the first is chosen
            expect(material.fill()).to.equal('var(--hair_color)')
            expect(material.parts()).to.deep.equal(['hair'])
        })
    })
})