import { User } from './user';
export class Mission {

    constructor(public id: number, public description: string, public endDate: string, public maxSalary: number, public minSalary: number, public recruiter: User, public startDate: string, public title: string) {
    }
}
