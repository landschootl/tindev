import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, BaseRequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { Experience } from './experience.model';
import { DateUtils } from 'ng-jhipster';
@Injectable()
export class ExperienceService {

    private resourceUrl = 'api/experiences';

    constructor(private http: Http, private dateUtils: DateUtils) { }

    create(experience: Experience): Observable<Experience> {
        let copy: Experience = Object.assign({}, experience);
        copy.startYear = this.dateUtils
            .convertLocalDateToServer(experience.startYear);
        copy.endYear = this.dateUtils
            .convertLocalDateToServer(experience.endYear);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    update(experience: Experience): Observable<Experience> {
        let copy: Experience = Object.assign({}, experience);
        copy.startYear = this.dateUtils
            .convertLocalDateToServer(experience.startYear);
        copy.endYear = this.dateUtils
            .convertLocalDateToServer(experience.endYear);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    find(id: number): Observable<Experience> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            let jsonResponse = res.json();
            jsonResponse.startYear = this.dateUtils
                .convertLocalDateFromServer(jsonResponse.startYear);
            jsonResponse.endYear = this.dateUtils
                .convertLocalDateFromServer(jsonResponse.endYear);
            return jsonResponse;
        });
    }

    query(req?: any): Observable<Response> {
        let options = this.createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: any) => this.convertResponse(res))
        ;
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }


    private convertResponse(res: any): any {
        let jsonResponse = res.json();
        for (let i = 0; i < jsonResponse.length; i++) {
            jsonResponse[i].startYear = this.dateUtils
                .convertLocalDateFromServer(jsonResponse[i].startYear);
            jsonResponse[i].endYear = this.dateUtils
                .convertLocalDateFromServer(jsonResponse[i].endYear);
        }
        res._body = jsonResponse;
        return res;
    }

    private createRequestOption(req?: any): BaseRequestOptions {
        let options: BaseRequestOptions = new BaseRequestOptions();
        if (req) {
            let params: URLSearchParams = new URLSearchParams();
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
