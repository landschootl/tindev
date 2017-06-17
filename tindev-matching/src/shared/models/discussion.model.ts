import { Freelance } from './freelance.model';
import { Mission } from './mission.model';
import { Message } from './message.model';

export class Discussion {
    constructor(public id?: number,
        public freelance?: Freelance,
        public mission?: Mission,
        public messages?: Message,) {
    }
}
