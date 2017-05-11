import { Freelance } from '../freelance';
export class Skill {
    constructor(
        public id?: number,
        public name?: string,
        public freelance?: Freelance,
    ) {
    }
}
