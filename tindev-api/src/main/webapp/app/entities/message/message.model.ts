import { Discussion } from '../discussion';
export class Message {
    constructor(public id?: number,
        public textMessage?: string,
        public postingDate?: any,
        public discussion?: Discussion,) {
    }
}
