import { Specialty } from '../specialty';
import { Domain } from '../domain';
import { Training } from '../training';
import { Skill } from '../skill';
import { Experience } from '../experience';
import { Discussion } from '../discussion';
export class Freelance {
    constructor(
        public id?: number,
        public dailyPrice?: number,
        public birthdate?: any,
        public idUser?: number,
        public specialty?: Specialty,
        public domain?: Domain,
        public trainings?: Training,
        public skills?: Skill,
        public experiences?: Experience,
        public discussions?: Discussion,
    ) {
    }
}
