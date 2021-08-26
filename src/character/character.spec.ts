import { html, fixture, expect } from '@open-wc/testing'
import { CaricaCharacter } from './character'
import './define'

describe('carica-character', () => {
    it('rendering', async () => {
        const el = await fixture<CaricaCharacter>(html`<carica-character></carica-character>`)

        expect(el).not.to.be.null
    })

    describe('skin color', () => {
        it('hex', async () => {
            const el = await fixture<CaricaCharacter>(html`
                <carica-character skin="#123456"></carica-character>
            `)
    
            expect(getComputedStyle(el).getPropertyValue('--carica_skin-color')).to.equal('#123456')
        })
    })
})
