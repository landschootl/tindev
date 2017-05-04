import { Specialty } from '../specialty';
export class Freelance {
    constructor(
        public id?: number,
        public dailyPrice?: number,
        public birthdate?: any,
        public specialty?: Specialty,
    ) {
    }
}
