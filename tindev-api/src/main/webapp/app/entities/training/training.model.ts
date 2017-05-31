import { Freelance } from '../freelance';
export class Training {
    constructor(
        public id?: number,
        public startDate?: any,
        public endDate?: any,
        public name?: string,
        public location?: string,
        public freelance?: Freelance,
    ) {
    }
}
