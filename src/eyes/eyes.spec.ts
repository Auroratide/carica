import { html, fixture, expect } from '@open-wc/testing'
import { CaricaEyes } from './eyes'
import './define'

describe('carica-eyes', () => {
    it('rendering', async () => {
        const el = await fixture<CaricaEyes>(html`
            <carica-eyes src="example-library/eyes.svg"></carica-eyes>
        `)

        expect(el.shadowRoot?.querySelector('img')?.src).to.contain('eyes.svg')
    })
})
