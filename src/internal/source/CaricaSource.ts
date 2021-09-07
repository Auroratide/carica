/**
 * The source information for a renderable graphic.
 */
export interface CaricaSource {
    /**
     * The renderable graphic as a document fragment to be appended
     */
    get(): Promise<DocumentFragment>
}
