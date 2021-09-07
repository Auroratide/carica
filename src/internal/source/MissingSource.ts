import { CaricaSource } from './CaricaSource'

/**
 * Abstraction for a missing source. Mostly useful for testing.
 */
export class MissingSource implements CaricaSource {
    get(): Promise<DocumentFragment> {
        return Promise.reject(new Error('Not Found'))
    }
}