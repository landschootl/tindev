import { Freelance } from './freelance.model';

export class Experience {
    constructor(public id?: number,
        public startYear?: any,
        public endYear?: any,
        public location?: string,
        public freelance?: Freelance,) {
    }
}
