import { Freelance } from './freelance.model';

export class Skill {
    constructor(public id?: number,
        public name?: string,
        public freelance?: Freelance,) {
    }
}
