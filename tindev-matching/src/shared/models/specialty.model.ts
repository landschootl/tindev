import { Freelance } from './freelance.model';

export class Specialty {
    constructor(
        public id?: number,
        public name?: string,
        public code?: number,
        public freelances?: Freelance,
    ) {
    }
}
