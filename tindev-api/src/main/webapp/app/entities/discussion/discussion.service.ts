import { Injectable } from '@angular/core';
import { BaseRequestOptions, Http, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { Discussion } from './discussion.model';
@Injectable()
export class DiscussionService {

    private resourceUrl = 'api/discussions';

    constructor(private http: Http) {
    }

    create(discussion: Discussion): Observable<Discussion> {
        const copy: Discussion = Object.assign({}, discussion);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    update(discussion: Discussion): Observable<Discussion> {
        const copy: Discussion = Object.assign({}, discussion);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    find(id: number): Observable<Discussion> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            return res.json();
        });
    }

    query(req?: any): Observable<Response> {
        const options = this.createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            ;
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
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
