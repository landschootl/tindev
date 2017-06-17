import { Injectable } from '@angular/core';
import { BaseRequestOptions, Http, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { Recruiter } from './recruiter.model';
@Injectable()
export class RecruiterService {

    private resourceUrl = 'api/recruiters';

    constructor(private http: Http) { }

    create(recruiter: Recruiter): Observable<Recruiter> {
        const copy: Recruiter = Object.assign({}, recruiter);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    update(recruiter: Recruiter): Observable<Recruiter> {
        const copy: Recruiter = Object.assign({}, recruiter);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    find(id: number): Observable<Recruiter> {
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

    findByIdUser(id: number): Observable<Recruiter> {
        return this.http.get(`api/users/${id}/recruiters`).map((res: Response) => {
            return res.json();
        });
    }
}
