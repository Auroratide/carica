import { expect } from '@open-wc/testing'
import { EntityFixture } from '../internal/testing/entity-fixture'
import { CaricaCharacter } from './character'
import { library } from '../internal/testing/example-library'
import './define'

describe('carica-character', () => {
    it('src provided', async () => {
        const entity = await new EntityFixture<CaricaCharacter>(`
            <carica-character src="${library.hair.medium}"></carica-character>
        `).mount()

        expect(entity.shadowRoot?.querySelector('svg')).to.exist
    })
})
