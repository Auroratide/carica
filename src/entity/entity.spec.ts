import { html, fixture, expect } from '@open-wc/testing'
import { CaricaEntity } from './entity'
import { StaticSource } from '../internal/source/StaticSource'
import './define'

describe('carica-entity', () => {
    const staticSvg = (svg: string) => {
        const template = document.createElement('template')
        template.innerHTML = svg

        return new StaticSource(template)
    }

    it('src provided', async () => {
        const el = await fixture<CaricaEntity>(html`
            <carica-entity src="example-library/hair.svg"></carica-entity>
        `)

        await new Promise(resolve => setTimeout(resolve, 10))

        expect(el.shadowRoot?.querySelector('svg')).to.exist
    })

    it('processes the source for customization', async () => {
        const entity = new CaricaEntity()
        entity.source = staticSvg(`
            <svg viewBox="0 0 1 1" xmlns:carica="https://auroratide.com/carica">
                <g carica:layer="head">
                    <path carica:material="skin" style="fill: red;" d="" />
                </g>
                <g carica:layer="afore-head">
                    <path carica:material="hair" carica:shade="dark" style="fill: red;" d="" />
                </g>
            </svg>
        `)

        const container = await fixture<HTMLElement>(html`<div></div>`)
        container.appendChild(entity)

        await new Promise(resolve => setTimeout(resolve, 10))

        // one svg for each layer
        expect(entity.shadowRoot?.querySelectorAll('svg')).to.have.length(2)

        // fill is based on a css var
        entity.shadowRoot?.querySelectorAll('path').forEach(path => {
            expect(path.style.fill).to.contain('var')
        })
    })
})
