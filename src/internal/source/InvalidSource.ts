import { CaricaSource } from './CaricaSource'

/**
 * Abstraction for an invalid source. Mostly useful for testing.
 */
export class InvalidSource implements CaricaSource {
    get(): Promise<DocumentFragment> {
        return Promise.reject(new Error('Invalid Type'))
    }
}