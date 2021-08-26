import { CaricaSource } from './CaricaSource'

export class MissingSource implements CaricaSource {
    get(): Promise<DocumentFragment> {
        return Promise.reject(new Error('Not Found'))
    }
}