import { Mission } from './mission.model';

export class Recruiter {
    constructor(public id?: number,
        public company?: string,
        public idUser?: number,
        public missions?: Mission,) {
    }
}
