import { expect } from '@open-wc/testing'
import { CaricaHair } from './hair'
import { EntityFixture } from '../internal/testing/entity-fixture'
import { library } from '../internal/testing/example-library'
import './define'

describe('carica-hair', () => {
    it('src provided', async () => {
        const entity = await new EntityFixture<CaricaHair>(`
            <carica-hair src="${library.hair.medium}"></carica-hair>
        `).mount()

        expect(entity.shadowRoot?.querySelector('svg')).to.exist
    })
})
