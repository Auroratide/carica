import { expect } from '@open-wc/testing'
import { CaricaMouth } from './mouth'
import { EntityFixture } from '../internal/testing/entity-fixture'
import { library } from '../internal/testing/example-library'
import './define'

describe('carica-mouth', () => {
    it('src provided', async () => {
        const entity = await new EntityFixture<CaricaMouth>(`
            <carica-mouth src="${library.mouths.smile}"></carica-mouth>
        `).mount()

        expect(entity.shadowRoot?.querySelector('svg')).to.exist
    })
})
