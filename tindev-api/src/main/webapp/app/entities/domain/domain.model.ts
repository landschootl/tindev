import { Freelance } from '../freelance';
import { Mission } from '../mission';
export class Domain {
    constructor(
        public id?: number,
        public name?: string,
        public code?: number,
        public freelances?: Freelance,
        public missions?: Mission,
    ) {
    }
}
