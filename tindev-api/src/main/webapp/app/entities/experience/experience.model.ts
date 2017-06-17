import { Freelance } from '../freelance';
export class Experience {
    constructor(public id?: number,
        public startYear?: any,
        public endYear?: any,
        public location?: string,
        public freelance?: Freelance,) {
    }
}
