import { Discussion } from '../discussion';
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
    ) {
    }
}
