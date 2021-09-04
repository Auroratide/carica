import { expect } from '@open-wc/testing'
import { CaricaEyebrows } from './eyebrows'
import { EntityFixture } from '../internal/testing/entity-fixture'
import './define'

describe('carica-eyebrows', () => {
    it('src provided', async () => {
        const entity = await new EntityFixture<CaricaEyebrows>(`
            <carica-eyebrows src="example-library/eyebrows.svg"></carica-eyebrows>
        `).mount()

        expect(entity.shadowRoot?.querySelector('svg')).to.exist
    })
})
