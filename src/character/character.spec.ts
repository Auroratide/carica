import { html, fixture, expect } from '@open-wc/testing'
import { CaricaCharacter } from './character'
import './define'

describe('carica-character', () => {
    it('src provided', async () => {
        const el = await fixture<CaricaCharacter>(html`
            <carica-character src="example-library/hair.svg"></carica-character>
        `)

        await new Promise(resolve => setTimeout(resolve, 10))

        expect(el.shadowRoot?.querySelector('svg')).to.exist
    })
})
