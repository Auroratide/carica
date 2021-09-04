import { CaricaEntity } from '../entity/entity'

export class CaricaCharacter extends CaricaEntity {
    static elementName = 'carica-character'

    static get css(): string {
        return super.css + `
            :host {
                --back_layer: 0;
                --afore-back_layer: 4;
        
                --behind-body_layer: 8;
                --body_layer: 12;
                --afore-body_layer: 16;
        
                --behind-head_layer: 20;
                --head_layer: 24;
                --afore-head_layer: 28;

                --behind-ear_layer: 32;
                --ear_layer: 36;
                --afore-ear_layer: 40;
        
                --behind-face_layer: 44;
                --face_layer: 48;
                --afore-face_layer: 52;
        
                --behind-front_layer: 56;
                --front_layer: 60;
            }
        `
    }

    constructor() {
        super()
    }
}
