import { Freelance } from '../freelance';
import { Mission } from '../mission';
export class Discussion {
    constructor(
        public id?: number,
        public freelance?: Freelance,
        public mission?: Mission,
    ) {
    }
}
