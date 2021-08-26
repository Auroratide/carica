import { CaricaSource } from './CaricaSource'

export class InvalidSource implements CaricaSource {
    get(): Promise<DocumentFragment> {
        return Promise.reject(new Error('Invalid Type'))
    }
}