import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { Recruiter } from './recruiter.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class RecruiterService {

    private resourceUrl = 'api/recruiters';

    constructor(private http: Http) { }

    create(recruiter: Recruiter): Observable<Recruiter> {
        const copy = this.convert(recruiter);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    update(recruiter: Recruiter): Observable<Recruiter> {
        const copy = this.convert(recruiter);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    find(id: number): Observable<Recruiter> {
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

    private convert(recruiter: Recruiter): Recruiter {
        const copy: Recruiter = Object.assign({}, recruiter);
        return copy;
    }
}
