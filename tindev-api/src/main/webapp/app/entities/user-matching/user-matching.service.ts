import { Injectable } from '@angular/core';
import { Http, Response, BaseRequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { UserMatching } from './user-matching.model';

@Injectable()
export class UserMatchingService {

    private resourceUrl = 'api/user-matchings';

    constructor(private http: Http) { }

    create(userMatching: UserMatching): Observable<UserMatching> {
        const copy: UserMatching = Object.assign({}, userMatching);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    update(userMatching: UserMatching): Observable<UserMatching> {
        const copy: UserMatching = Object.assign({}, userMatching);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    find(id: number): Observable<UserMatching> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            return res.json();
        });
    }

    query(req?: any): Observable<Response> {
        const options = this.createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    private convertResponse(res: any): any {
        const jsonResponse = res.json();
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
