import { Discussion } from '../discussion';
import { User } from '../../shared';
export class Message {
    constructor(
        public id?: number,
        public textMessage?: string,
        public postingDate?: any,
        public discussion?: Discussion,
        public user?: User,
    ) {
    }
}
