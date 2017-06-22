import { Discussion } from '../discussion';
import { UserProfile } from '../user-profile';
export class Message {
    constructor(
        public id?: number,
        public textMessage?: string,
        public postingDate?: any,
        public discussion?: Discussion,
        public sender?: UserProfile,
    ) {
    }
}
