import { html, fixture, expect } from '@open-wc/testing'
import { CaricaHead } from './head'
import './define'

describe('carica-head', () => {
    it('src provided', async () => {
        const el = await fixture<CaricaHead>(html`
            <carica-head></carica-head>
        `)

        expect(el.shadowRoot?.querySelector('svg')).to.exist
    })
})
