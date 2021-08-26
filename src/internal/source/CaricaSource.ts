export interface CaricaSource {
    get(): Promise<DocumentFragment>
}
