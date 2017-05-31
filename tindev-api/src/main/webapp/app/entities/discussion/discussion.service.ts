import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { Discussion } from './discussion.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class DiscussionService {

    private resourceUrl = 'api/discussions';

    constructor(private http: Http) { }

    create(discussion: Discussion): Observable<Discussion> {
        const copy = this.convert(discussion);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    update(discussion: Discussion): Observable<Discussion> {
        const copy = this.convert(discussion);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    find(id: number): Observable<Discussion> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            return res.json();
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        return new ResponseWrapper(res.headers, jsonResponse, res.status);
    }

    private convert(discussion: Discussion): Discussion {
        const copy: Discussion = Object.assign({}, discussion);
        return copy;
    }
}
