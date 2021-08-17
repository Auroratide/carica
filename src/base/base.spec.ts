import { html, fixture, expect } from '@open-wc/testing'
import { CaricaBase } from './base'
import './define'

describe('carica-base', () => {
    it('rendering', async () => {
        const el = await fixture<CaricaBase>(html`<carica-base></carica-base>`)

        expect(el).not.to.be.null
    })
})