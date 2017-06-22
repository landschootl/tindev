import { Discussion } from './discussion.model';
import {UserProfile} from "./user-profile.model";

export class Message {
    constructor(public id?: number,
        public textMessage?: string,
        public postingDate?: any,
        public discussion?: Discussion,
        public sender?: UserProfile) {
    }
}
