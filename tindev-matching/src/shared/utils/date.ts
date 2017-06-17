export class DateUtils {

    constructor() {
    }

    public getDateFromString(sdate: string): Date {
        let date = new Date(sdate);
        return date;
    }
}
