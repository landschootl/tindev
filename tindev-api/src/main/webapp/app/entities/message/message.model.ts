import { Discussion } from '../discussion';
import { Userprofile } from '../userprofile';
export class Message {
    constructor(
        public id?: number,
        public textMessage?: string,
        public postingDate?: any,
        public discussion?: Discussion,
        public userProfile?: Userprofile,
    ) {
    }
}
