import { Discussion } from './discussion.model';

export class Message {
    constructor(public id?: number,
        public textMessage?: string,
        public postingDate?: any,
        public discussion?: Discussion,) {
    }
}
