import { expect } from '@open-wc/testing'
import { Material } from './material'
import { Shade } from './shade'

describe('carica:shade', () => {
    describe('fill', () => {
        it('default not provided', () => {
            const shade = new Shade('dark', new Material('hair'))

            expect(shade.fill()).to.equal('var(--hair-dark_color, var(--hair_color))')
        })

        it('default provided', () => {
            const shade = new Shade('dark', new Material('hair'))

            expect(shade.fill('red')).to.equal('var(--hair-dark_color, var(--hair_color, red))')
        })
    })

    describe('factory', () => {
        const fallbackMaterial = new Material('iris')
        const fallback = new Shade('light', new Material('iris'))

        it('shade is defined', () => {
            const elem = document.createElementNS('http://www.w3.org/2000/svg', 'path')
            elem.setAttribute(Shade.attributeName, 'dark')

            const shade = Shade.from(elem, fallback)
            expect(shade!.value).to.equal('dark')
        })

        it('shade not defined', () => {
            const elem = document.createElementNS('http://www.w3.org/2000/svg', 'path')
            const shade = Shade.from(elem, fallback)
            expect(shade!.value).to.equal(fallback.value)
        })

        it('material defined', () => {
            const elem = document.createElementNS('http://www.w3.org/2000/svg', 'path')
            elem.setAttribute(Material.attributeName, 'hair')
            elem.setAttribute(Shade.attributeName, 'dark')

            const shade = Shade.from(elem, fallback)
            expect(shade!.material.value).to.equal('hair')
        })

        it('material not defined', () => {
            const elem = document.createElementNS('http://www.w3.org/2000/svg', 'path')
            elem.setAttribute(Shade.attributeName, 'dark')

            const shade = Shade.from(elem, fallback)
            expect(shade!.material.value).to.equal(fallback.material.value)
        })
    })

    describe('edge cases', () => {
        it('empty', () => {
            const shade = new Shade('', new Material('hair'))

            expect(shade.fill()).to.equal('var(--hair_color)')
        })

        it('has whitespace', () => {
            const shade = new Shade(' dark ', new Material('hair'))

            expect(shade.fill()).to.equal('var(--hair-dark_color, var(--hair_color))')
        })

        it('multiple values', () => {
            const shade = new Shade('dark light', new Material('hair'))

            // Only the first is chosen
            expect(shade.fill()).to.equal('var(--hair-dark_color, var(--hair_color))')
        })

        it('no material', () => {
            const shade = new Shade('dark', Material.NONE)

            expect(shade.fill()).to.equal('')
            expect(shade.fill('red')).to.equal('red')
        })
    })
})