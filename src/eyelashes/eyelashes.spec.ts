import { expect } from '@open-wc/testing'
import { CaricaEyelashes } from './eyelashes'
import { EntityFixture } from '../internal/testing/entity-fixture'
import { library } from '../internal/testing/example-library'
import './define'

describe('carica-eyelashes', () => {
    it('src provided', async () => {
        const entity = await new EntityFixture<CaricaEyelashes>(`
            <carica-eyelashes src="${library.eyelashes.neutral}"></carica-eyelashes>
        `).mount()

        expect(entity.shadowRoot?.querySelector('svg')).to.exist
    })
})
