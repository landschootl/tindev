import { Injectable } from '@angular/core';
import { BaseRequestOptions, Http, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { Matching } from './matching.model';
import { DateUtils } from 'ng-jhipster';
@Injectable()
export class MatchingService {

    private resourceUrl = 'api/matchings';

    constructor(private http: Http, private dateUtils: DateUtils) { }

    create(matching: Matching): Observable<Matching> {
        let copy: Matching = Object.assign({}, matching);
        copy.fLikedDate = this.dateUtils
            .convertLocalDateToServer(matching.fLikedDate);
        copy.rLikedDate = this.dateUtils
            .convertLocalDateToServer(matching.rLikedDate);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    update(matching: Matching): Observable<Matching> {
        let copy: Matching = Object.assign({}, matching);
        copy.fLikedDate = this.dateUtils
            .convertLocalDateToServer(matching.fLikedDate);
        copy.rLikedDate = this.dateUtils
            .convertLocalDateToServer(matching.rLikedDate);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    find(id: number): Observable<Matching> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            let jsonResponse = res.json();
            jsonResponse.fLikedDate = this.dateUtils
                .convertLocalDateFromServer(jsonResponse.fLikedDate);
            jsonResponse.rLikedDate = this.dateUtils
                .convertLocalDateFromServer(jsonResponse.rLikedDate);
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
            jsonResponse[i].fLikedDate = this.dateUtils
                .convertLocalDateFromServer(jsonResponse[i].fLikedDate);
            jsonResponse[i].rLikedDate = this.dateUtils
                .convertLocalDateFromServer(jsonResponse[i].rLikedDate);
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
