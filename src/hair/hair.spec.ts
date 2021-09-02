import { expect } from '@open-wc/testing'
import { CaricaHair } from './hair'
import { EntityFixture } from '../internal/testing/entity-fixture'
import './define'

describe('carica-hair', () => {
    it('src provided', async () => {
        const entity = await new EntityFixture<CaricaHair>(`
            <carica-hair src="example-library/hair.svg"></carica-hair>
        `).mount()

        expect(entity.shadowRoot?.querySelector('svg')).to.exist
    })
})
