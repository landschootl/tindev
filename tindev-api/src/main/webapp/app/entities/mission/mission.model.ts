import { Discussion } from '../discussion';
import { Recruiter } from '../recruiter';
import { Matching } from '../matching';
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
    ) {
    }
}
