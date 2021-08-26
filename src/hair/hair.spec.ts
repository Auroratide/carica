import { html, fixture, expect } from '@open-wc/testing'
import { CaricaHair } from './hair'
import './define'

describe('carica-hair', () => {
    it('src provided', async () => {
        const el = await fixture<CaricaHair>(html`
            <carica-hair src="example-library/hair.svg"></carica-hair>
        `)

        await new Promise(resolve => setTimeout(resolve, 10))

        expect(el.shadowRoot?.querySelector('svg')).to.exist
    })
})
