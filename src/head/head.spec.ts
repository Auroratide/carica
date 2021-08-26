import { html, fixture, expect } from '@open-wc/testing'
import { CaricaHead } from './head'
import './define'

describe('carica-head', () => {
    it('src provided', async () => {
        const el = await fixture<CaricaHead>(html`
            <carica-head></carica-head>
        `)

        await new Promise(resolve => setTimeout(resolve, 10))

        expect(el.shadowRoot?.querySelector('svg')).to.exist
    })
})
