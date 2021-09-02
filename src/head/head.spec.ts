import { expect } from '@open-wc/testing'
import { CaricaHead } from './head'
import { EntityFixture } from '../internal/testing/entity-fixture'
import './define'

describe('carica-head', () => {
    it('src provided', async () => {
        const entity = await new EntityFixture<CaricaHead>(`
            <carica-head></carica-head>
        `).mount()

        expect(entity.shadowRoot?.querySelector('svg')).to.exist
    })
})
