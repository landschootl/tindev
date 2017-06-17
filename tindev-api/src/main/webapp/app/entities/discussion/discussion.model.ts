import { Freelance } from '../freelance';
import { Mission } from '../mission';
import { Message } from '../message';
export class Discussion {
    constructor(
        public id?: number,
        public freelance?: Freelance,
        public mission?: Mission,
        public messages?: Message,
    ) {
    }
}
