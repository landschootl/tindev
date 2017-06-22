import { Freelance } from './freelance.model';
import { Mission } from './mission.model';
import { Message } from './message.model';
import { UserProfile } from './user-profile.model';
import { User } from './user';

export class Discussion {
    constructor(public id?: number,
        public freelance?: Freelance,
        public mission?: Mission,
        public messages?: Message[],
        public freelanceProfile?: UserProfile,
        public missionProfile?: UserProfile,
        public freelanceUser?: User,
        public missionUser?: User) {
    }
}
