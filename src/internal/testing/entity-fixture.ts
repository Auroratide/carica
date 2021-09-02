import { fixture } from '@open-wc/testing'
import { CaricaEntity } from '../../entity/entity'
import { LoadEvent } from '../../events/load'
import { StaticSource } from '../source/StaticSource'

export class EntityFixture<T extends CaricaEntity> {
    private container: HTMLElement
    private entity: T

    constructor(html: string) {
        this.container = document.createElement('div')
        this.container.innerHTML = html

        this.entity = this.container.firstElementChild as T
    }

    withStaticSvg(svg: string): EntityFixture<T> {
        const template = document.createElement('template')
        template.innerHTML = svg

        this.entity.source = new StaticSource(template)

        return this
    }

    async mount(): Promise<T> {
        let loaded = Promise.resolve(this.entity)
        if (this.entity.source) {
            loaded = new Promise(resolve => this.entity.addEventListener(LoadEvent.eventName, () => resolve(this.entity)))
        }

        await fixture(this.container)

        return loaded
    }
}