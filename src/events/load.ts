export class LoadEvent extends CustomEvent<void> {
    static eventName = 'carica:load'

    constructor() {
        super(LoadEvent.eventName)
    }
}
