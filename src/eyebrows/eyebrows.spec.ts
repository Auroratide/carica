import { expect } from '@open-wc/testing'
import { CaricaEyebrows } from './eyebrows'
import { EntityFixture } from '../internal/testing/entity-fixture'
import { library } from '../internal/testing/example-library'
import './define'

describe('carica-eyebrows', () => {
    it('src provided', async () => {
        const entity = await new EntityFixture<CaricaEyebrows>(`
            <carica-eyebrows src="${library.eyebrows.neutral}"></carica-eyebrows>
        `).mount()

        expect(entity.shadowRoot?.querySelector('svg')).to.exist
    })
})
