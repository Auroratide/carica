import { html, fixture, expect } from '@open-wc/testing'
import { CaricaCharacter } from './character'
import './define'

describe('carica-character', () => {
    it('rendering', async () => {
        const el = await fixture<CaricaCharacter>(html`<carica-character></carica-character>`)

        expect(el).not.to.be.null
    })
})
