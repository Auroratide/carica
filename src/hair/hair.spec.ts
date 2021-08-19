import { html, fixture, expect } from '@open-wc/testing'
import { CaricaHair } from './hair'
import './define'

describe('carica-hair', () => {
    it('rendering', async () => {
        const el = await fixture<CaricaHair>(html`
            <carica-hair src="example-library/hair.svg"></carica-hair>
        `)

        expect(el.shadowRoot?.querySelector('img')?.src).to.contain('hair.svg')
    })
})
