import { Specialty } from '../specialty';
import { Domain } from '../domain';
import { Training } from '../training';
import { Skill } from '../skill';
import { Experience } from '../experience';
export class Freelance {
    constructor(
        public id?: number,
        public dailyPrice?: number,
        public birthdate?: any,
        public specialty?: Specialty,
        public domain?: Domain,
        public trainings?: Training,
        public skills?: Skill,
        public experiences?: Experience,
    ) {
    }
}
