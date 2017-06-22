import { Mission } from './mission.model';
import { Freelance } from './freelance.model';
import { UserProfile } from './user-profile.model';
import { User } from './user';

export class Matching {
    constructor(public id?: number,
        public score?: number,
        public fLikedDate?: any,
        public rLikedDate?: any,
        public freelanceLiked?: boolean,
        public recruiterLiked?: boolean,
        public freelanceVoted?: boolean,
        public recruiterVoted?: boolean,
        public mission?: Mission,
        public freelance?: Freelance,
        public freelanceProfile?: UserProfile,
        public missionProfile?: UserProfile,
        public freelanceUser?: User,
        public missionUser?: User) {
        this.freelanceLiked = false;
        this.recruiterLiked = false;
        this.freelanceVoted = false;
        this.recruiterVoted = false;
    }
}
