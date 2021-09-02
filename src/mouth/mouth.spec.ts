import { html, fixture, expect } from '@open-wc/testing'
import { CaricaMouth } from './mouth'
import { LoadEvent } from '../events/load'
import './define'

describe('carica-mouth', () => {
    it('src provided', async () => {
        const el = await fixture<CaricaMouth>(html`
            <carica-mouth src="example-library/mouth.svg"></carica-mouth>
        `)

        await new Promise(resolve => el.addEventListener(LoadEvent.eventName, resolve))

        expect(el.shadowRoot?.querySelector('svg')).to.exist
    })
})
