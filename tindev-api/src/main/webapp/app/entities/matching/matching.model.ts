import { Mission } from '../mission';
import { Freelance } from '../freelance';
export class Matching {
    constructor(
        public id?: number,
        public score?: number,
        public fLikedDate?: any,
        public rLikedDate?: any,
        public freelanceLiked?: boolean,
        public recruiterLiked?: boolean,
        public freelanceVoted?: boolean,
        public recruiterVoted?: boolean,
        public mission?: Mission,
        public freelance?: Freelance,
    ) {
        this.freelanceLiked = false;
        this.recruiterLiked = false;
        this.freelanceVoted = false;
        this.recruiterVoted = false;
    }
}
