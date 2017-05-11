import { Message } from '../message';
export class User {
    constructor(
        public id?: number,
        public messages?: Message,
    ) {
    }
}
