import { Discussion } from '../discussion';
import { Recruiter } from '../recruiter';
import { Matching } from '../matching';
import { Specialty } from '../specialty';
import { Domain } from '../domain';
export class Mission {
    constructor(
        public id?: number,
        public title?: string,
        public description?: string,
        public minSalary?: number,
        public maxSalary?: number,
        public startDate?: any,
        public endDate?: any,
        public discussions?: Discussion,
        public recruiter?: Recruiter,
        public matchings?: Matching,
        public specialty?: Specialty,
        public domain?: Domain,
    ) {
    }
}
