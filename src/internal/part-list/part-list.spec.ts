import { html, fixture, expect } from '@open-wc/testing'
import { PartList } from '.'

describe('PartList', () => {
    describe('adding', () => {
        it('part names', async () => {
            const el = await fixture(html`<div></div>`)
    
            const list = PartList.of(el)
    
            list.add('apple')
            expect(el.getAttribute('part')).to.equal('apple')
    
            list.add('orange')
            expect(el.getAttribute('part')).to.equal('apple orange')
        })

        it('name already in list', async () => {
            const el = await fixture(html`<div part="apple"></div>`)
    
            const list = PartList.of(el)
    
            list.add('apple')
            expect(el.getAttribute('part')).to.equal('apple')
        })

        it('multiple at once', async () => {
            const el = await fixture(html`<div></div>`)
    
            const list = PartList.of(el)
    
            list.add('apple', 'orange')
            expect(el.getAttribute('part')).to.equal('apple orange')
        })
    })

    describe('values', () => {
        it('empty', async () => {
            const el = await fixture(html`<div></div>`)
    
            const list = PartList.of(el)

            expect(list.values()).to.deep.equal([])
        })

        it('has values', async () => {
            const el = await fixture(html`<div part="apple orange"></div>`)
    
            const list = PartList.of(el)

            expect(list.values()).to.deep.equal(['apple', 'orange'])
        })
    })
})