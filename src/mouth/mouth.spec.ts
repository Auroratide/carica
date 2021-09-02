import { expect } from '@open-wc/testing'
import { CaricaMouth } from './mouth'
import { EntityFixture } from '../internal/testing/entity-fixture'
import './define'

describe('carica-mouth', () => {
    it('src provided', async () => {
        const entity = await new EntityFixture<CaricaMouth>(`
            <carica-mouth src="example-library/mouth.svg"></carica-mouth>
        `).mount()

        expect(entity.shadowRoot?.querySelector('svg')).to.exist
    })
})
