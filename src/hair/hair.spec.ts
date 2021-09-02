import { html, fixture, expect } from '@open-wc/testing'
import { CaricaHair } from './hair'
import { LoadEvent } from '../events/load'
import './define'

describe('carica-hair', () => {
    it('src provided', async () => {
        const el = await fixture<CaricaHair>(html`
            <carica-hair src="example-library/hair.svg"></carica-hair>
        `)

        await new Promise(resolve => el.addEventListener(LoadEvent.eventName, resolve))

        expect(el.shadowRoot?.querySelector('svg')).to.exist
    })
})
