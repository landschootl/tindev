import { Discussion } from './discussion.model';
import { Recruiter } from './recruiter.model';
import { Matching } from './matching.model';
import {Specialty} from "./specialty.model";
import {Domain} from "./domain.model";

export class Mission {
    constructor(public id?: number,
        public title?: string,
        public description?: string,
        public minSalary?: number,
        public maxSalary?: number,
        public startDate?: any,
        public endDate?: any,
        public photoUrl?: string,
        public discussions?: Discussion,
        public recruiter?: Recruiter,
        public specialty?: Specialty,
        public domain?: Domain,
        public matchings?: Matching) {
    }
}
