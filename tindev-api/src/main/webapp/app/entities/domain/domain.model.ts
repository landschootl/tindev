import { Freelance } from '../freelance';
export class Domain {
    constructor(public id?: number,
        public name?: string,
        public code?: number,
        public freelances?: Freelance,) {
    }
}
