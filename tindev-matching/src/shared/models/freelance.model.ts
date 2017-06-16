import { Specialty } from "./specialty.model";
import { Domain } from './domain.model';
import { Training } from './training.model';
import { Skill } from './skill.model';
import { Experience } from './experience.model';
import { Discussion } from './discussion.model';
import { Matching } from './matching.model';

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
        public matchings?: Matching,
    ) {
    }
}
