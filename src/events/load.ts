/**
 * Dispatched on an entity when a graphic source is fully fetched and
 * processed.
 */
export class LoadEvent extends CustomEvent<void> {
    static eventName = 'carica:load'

    constructor() {
        super(LoadEvent.eventName)
    }
}
