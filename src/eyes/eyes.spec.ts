import { html, fixture, expect } from '@open-wc/testing'
import { CaricaEyes } from './eyes'
import { LoadEvent } from '../events/load'
import './define'

describe('carica-eyes', () => {
    it('src provided', async () => {
        const el = await fixture<CaricaEyes>(html`
            <carica-eyes src="example-library/hair.svg"></carica-eyes>
        `)

        await new Promise(resolve => el.addEventListener(LoadEvent.eventName, resolve))

        expect(el.shadowRoot?.querySelector('svg')).to.exist
    })
})
