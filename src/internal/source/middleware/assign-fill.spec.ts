import { expect } from '@open-wc/testing'
import { assignFill } from './assign-fill'
import { Material } from '../../namespace/material'
import { Shade } from '../../namespace/shade'

describe('assignFill', () => {
    const withFragment = (contents: string) => {
        const template = document.createElement('template')
        template.innerHTML = contents

        return template.content
    }

    it('empty input', () => {
        const result = assignFill(document.createDocumentFragment()).children

        expect(result).to.be.empty
    })

    it('no material', async () => {
        const fragment = withFragment(`
            <svg viewBox="0 0 1 2">
                <path fill="red" d="" />
            </svg>
        `)

        const result = assignFill(fragment).children[0]

        expect(result.querySelector('path')?.getAttribute('fill')).to.equal('red')
    })

    it('fill undefined', async () => {
        const fragment = withFragment(`
            <svg viewBox="0 0 1 2">
                <path carica:material="hair" d="" />
            </svg>
        `)

        const result = assignFill(fragment).children[0]

        expect(result.querySelector('path')?.getAttribute('fill')).to.be.null
        expect(result.querySelector('path')?.style.fill).to.equal('')
    })

    describe('material defined on the node', () => {
        it('using fill', async () => {
            const fragment = withFragment(`
                <svg viewBox="0 0 1 2">
                    <path carica:material="hair" fill="red" d="" />
                </svg>
            `)

            const result = assignFill(fragment).children[0]
            const path = result.querySelector('path')!

            expect(path.style.fill).to.equal(new Material('hair').fill('red'))
            expect(path.getAttribute('part')).to.equal('hair-material')
        })

        it('using style', async () => {
            const fragment = withFragment(`
                <svg viewBox="0 0 1 2">
                    <path carica:material="hair" style="fill: red;" d="" />
                </svg>
            `)

            const result = assignFill(fragment).children[0]
            const path = result.querySelector('path')!

            expect(path.style.fill).to.equal(new Material('hair').fill('red'))
            expect(path.getAttribute('part')).to.equal('hair-material')
        })

        it('shade defined', () => {
            const fragment = withFragment(`
                <svg viewBox="0 0 1 2">
                    <path carica:material="hair" carica:shade="dark" style="fill: red;" d="" />
                </svg>
            `)
    
            const result = assignFill(fragment).children[0]
            const path = result.querySelector('path')!
    
            expect(path.style.fill).to.equal(new Shade('dark', new Material('hair')).fill('red'))
            expect(path.getAttribute('part')).to.equal('hair-material dark-shade')
        })

        it('already has parts defined', () => {
            const fragment = withFragment(`
                <svg viewBox="0 0 1 2">
                    <path part="head" carica:material="hair" style="fill: red;" d="" />
                </svg>
            `)
    
            const result = assignFill(fragment).children[0]
            const path = result.querySelector('path')!
    
            expect(path.getAttribute('part')).to.equal('head hair-material')
        })
    })

    describe('material defined on a parent', () => {
        it('parent is a group element', () => {
            const fragment = withFragment(`
                <svg viewBox="0 0 1 2">
                    <g carica:material="hair">
                        <path style="fill: red;" d="" />
                        <path style="fill: blue;" d="" />
                    </g>
                </svg>
            `)
    
            const result = assignFill(fragment).children[0]
            const paths = result.querySelectorAll('path')
    
            expect(paths[0].style.fill).to.equal(new Material('hair').fill('red'))
            expect(paths[1].style.fill).to.equal(new Material('hair').fill('blue'))
        })

        it('parent is the root svg', () => {
            const fragment = withFragment(`
                <svg viewBox="0 0 1 2" carica:material="hair">
                    <path style="fill: red;" d="" />
                    <path style="fill: blue;" d="" />
                </svg>
            `)
    
            const result = assignFill(fragment).children[0]
            const paths = result.querySelectorAll('path')
    
            expect(paths[0].style.fill).to.equal(new Material('hair').fill('red'))
            expect(paths[1].style.fill).to.equal(new Material('hair').fill('blue'))
        })

        it('shade is also defined on the parent', () => {
            const fragment = withFragment(`
                <svg viewBox="0 0 1 2">
                    <g carica:material="hair" carica:shade="dark">
                        <path style="fill: red;" d="" />
                    </g>
                </svg>
            `)
    
            const result = assignFill(fragment).children[0]
            const path = result.querySelector('path')!
    
            expect(path.style.fill).to.equal(new Shade('dark', new Material('hair')).fill('red'))
        })

        it('shade is defined on the node', () => {
            const fragment = withFragment(`
                <svg viewBox="0 0 1 2">
                    <g carica:material="hair">
                        <path carica:shade="dark" style="fill: red;" d="" />
                    </g>
                </svg>
            `)
    
            const result = assignFill(fragment).children[0]
            const path = result.querySelector('path')!
    
            expect(path.style.fill).to.equal(new Shade('dark', new Material('hair')).fill('red'))
        })

        it('the node overrides the parent material', () => {
            const fragment = withFragment(`
                <svg viewBox="0 0 1 2">
                    <g carica:material="hair">
                        <path carica:material="iris" style="fill: red;" d="" />
                    </g>
                </svg>
            `)
    
            const result = assignFill(fragment).children[0]
            const path = result.querySelector('path')!
    
            expect(path.style.fill).to.equal(new Material('iris').fill('red'))
        })

        it('another parent overrides the parent material', () => {
            const fragment = withFragment(`
                <svg viewBox="0 0 1 2">
                    <g carica:material="hair">
                        <g carica:material="iris">
                            <path style="fill: red;" d="" />
                        </g>
                    </g>
                </svg>
            `)
    
            const result = assignFill(fragment).children[0]
            const path = result.querySelector('path')!
    
            expect(path.style.fill).to.equal(new Material('iris').fill('red'))
        })
    })

    it('shade defined without a material', async () => {
        const fragment = withFragment(`
            <svg viewBox="0 0 1 2">
                <path carica:shade="dark" style="fill: red;" d="" />
            </svg>
        `)

        const result = assignFill(fragment).children[0]

        // shade is ignored; material is required
        expect(result.querySelector('path')?.style.fill).to.equal('red')
    })
})
