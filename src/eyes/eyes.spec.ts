import { expect } from '@open-wc/testing'
import { CaricaEyes } from './eyes'
import { EntityFixture } from '../internal/testing/entity-fixture'
import { library } from '../internal/testing/example-library'
import './define'

describe('carica-eyes', () => {
    it('src provided', async () => {
        const entity = await new EntityFixture<CaricaEyes>(`
            <carica-eyes src="${library.eyes.neutral}"></carica-eyes>
        `).mount()

        expect(entity.shadowRoot?.querySelector('svg')).to.exist
    })
})
