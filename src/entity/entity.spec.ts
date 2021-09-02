import { expect } from '@open-wc/testing'
import { CaricaEntity } from './entity'
import { EntityFixture } from '../internal/testing/entity-fixture'
import './define'
import { LoadEvent } from '../events/load'

describe('carica-entity', () => {
    describe('source', () => {
        it('src provided', async () => {
            const entity = await new EntityFixture<CaricaEntity>(`
                <carica-entity src="example-library/hair.svg"></carica-entity>
            `).mount()
    
            expect(entity.shadowRoot?.querySelector('svg')).to.exist
        })

        it('src is altered', async () => {
            const entity = await new EntityFixture<CaricaEntity>(`
                <carica-entity src="example-library/mouth.svg"></carica-entity>
            `).mount()

            // the example mouth has just one layer
            expect(entity.shadowRoot?.querySelectorAll('svg')).to.have.length(1)

            // the example hair has three layers
            const loaded = new Promise(resolve => entity.addEventListener(LoadEvent.eventName, resolve))

            entity.src = 'example-library/hair.svg'
            await loaded
            expect(entity.shadowRoot?.querySelectorAll('svg')).to.have.length(3)
        })
    
        it('processes the source for customization', async () => {
            const entity = await new EntityFixture<CaricaEntity>(`
                <carica-entity></carica-entity>
            `).withStaticSvg(`
                <svg viewBox="0 0 1 1" xmlns:carica="https://auroratide.com/carica">
                    <g carica:layer="head">
                        <path carica:material="skin" style="fill: red;" d="" />
                    </g>
                    <g carica:layer="afore-head">
                        <path carica:material="hair" carica:shade="dark" style="fill: red;" d="" />
                    </g>
                </svg>
            `).mount()
    
            // one svg for each layer
            expect(entity.shadowRoot?.querySelectorAll('svg')).to.have.length(2)
    
            // fill is based on a css var
            entity.shadowRoot?.querySelectorAll('path').forEach(path => {
                expect(path.style.fill).to.contain('var')
            })
        })
    })

    describe('color-* attributes', () => {
        it('colors assigned before connecting', async () => {
            const entity = await new EntityFixture(`
                <carica-entity color-skin="rgb(0, 0, 255)" color-hair="rgb(0, 255, 0)"></carica-entity>
            `).withStaticSvg(`
                <svg viewBox="0 0 1 1" xmlns:carica="https://auroratide.com/carica">
                    <path id="skin" carica:material="skin" style="fill: red;" d="" />
                    <path id="hair" carica:material="hair" style="fill: blue;" d="" />
                </svg>
            `).mount()

            const skin = entity.shadowRoot?.querySelector('#skin')!
            const hair = entity.shadowRoot?.querySelector('#hair')!

            expect(getComputedStyle(skin).fill).to.equal('rgb(0, 0, 255)')
            expect(getComputedStyle(hair).fill).to.equal('rgb(0, 255, 0)')
        })
    })

    describe('accessibility', () => {
        describe('alt', () => {
            it('alt provided', async () => {
                const entity = await new EntityFixture(`
                    <carica-entity alt="Example alt text"></carica-entity>
                `).mount()

                expect(entity.getAttribute('aria-label')).to.equal('Example alt text')
            })

            it('alt not provided', async () => {
                const entity = await new EntityFixture(`
                    <carica-entity></carica-entity>
                `).mount()

                expect(entity.getAttribute('aria-label')).to.equal('')
            })

            it('aria-label already provided', async () => {
                const entity = await new EntityFixture(`
                    <carica-entity aria-label="label text" alt="alt text"></carica-entity>
                `).mount()

                expect(entity.getAttribute('aria-label')).to.equal('label text')
            })
        })

        describe('role', () => {
            it('role provided', async () => {
                const entity = await new EntityFixture(`
                    <carica-entity role="figure" alt="Example alt text"></carica-entity>
                `).mount()

                expect(entity.getAttribute('role')).to.equal('figure')
            })

            it('role not provided', async () => {
                const entity = await new EntityFixture(`
                    <carica-entity alt="Example alt text"></carica-entity>
                `).mount()

                expect(entity.getAttribute('role')).to.equal('img')
            })
        })
    })
})
