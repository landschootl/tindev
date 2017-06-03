import { Freelance } from '../freelance';
import { Recruiter } from '../recruiter';
export class UserMatching {
    constructor(
        public id?: number,
        public score?: number,
        public freelance?: Freelance,
        public recruiter?: Recruiter,
    ) {
    }
}
