import { Injectable } from '@angular/core';
import { BaseRequestOptions, Http, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { Training } from './training.model';
import { DateUtils } from 'ng-jhipster';
@Injectable()
export class TrainingService {

    private resourceUrl = 'api/trainings';

    constructor(private http: Http, private dateUtils: DateUtils) { }

    create(training: Training): Observable<Training> {
        const copy: Training = Object.assign({}, training);
        copy.startDate = this.dateUtils
            .convertLocalDateToServer(training.startDate);
        copy.endDate = this.dateUtils
            .convertLocalDateToServer(training.endDate);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    update(training: Training): Observable<Training> {
        const copy: Training = Object.assign({}, training);
        copy.startDate = this.dateUtils
            .convertLocalDateToServer(training.startDate);
        copy.endDate = this.dateUtils
            .convertLocalDateToServer(training.endDate);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    find(id: number): Observable<Training> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            jsonResponse.startDate = this.dateUtils
                .convertLocalDateFromServer(jsonResponse.startDate);
            jsonResponse.endDate = this.dateUtils
                .convertLocalDateFromServer(jsonResponse.endDate);
            return jsonResponse;
        });
    }

    query(req?: any): Observable<Response> {
        const options = this.createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: any) => this.convertResponse(res))
        ;
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    private convertResponse(res: any): any {
        const jsonResponse = res.json();
        for (let i = 0; i < jsonResponse.length; i++) {
            jsonResponse[i].startDate = this.dateUtils
                .convertLocalDateFromServer(jsonResponse[i].startDate);
            jsonResponse[i].endDate = this.dateUtils
                .convertLocalDateFromServer(jsonResponse[i].endDate);
        }
        res._body = jsonResponse;
        return res;
    }

    private createRequestOption(req?: any): BaseRequestOptions {
        const options: BaseRequestOptions = new BaseRequestOptions();
        if (req) {
            const params: URLSearchParams = new URLSearchParams();
            params.set('page', req.page);
            params.set('size', req.size);
            if (req.sort) {
                params.paramsMap.set('sort', req.sort);
            }
            params.set('query', req.query);

            options.search = params;
        }
        return options;
    }
}
