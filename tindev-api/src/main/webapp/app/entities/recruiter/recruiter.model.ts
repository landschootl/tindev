import { Mission } from '../mission';
export class Recruiter {
    constructor(public id?: number,
        public company?: string,
        public idUser?: number,
        public missions?: Mission,) {
    }
}
