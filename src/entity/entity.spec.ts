import { html, fixture, expect } from '@open-wc/testing'
import { CaricaEntity } from './entity'
import './define'

describe('carica-entity', () => {
    it('src provided', async () => {
        const el = await fixture<CaricaEntity>(html`
            <carica-entity src="example-library/hair.svg"></carica-entity>
        `)

        await new Promise(resolve => setTimeout(resolve, 10))

        expect(el.shadowRoot?.querySelector('svg')).to.exist
    })
})
