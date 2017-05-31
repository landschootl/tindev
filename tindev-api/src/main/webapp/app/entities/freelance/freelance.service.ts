import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { DateUtils } from 'ng-jhipster';

import { Freelance } from './freelance.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class FreelanceService {

    private resourceUrl = 'api/freelances';

    constructor(private http: Http, private dateUtils: DateUtils) { }

    create(freelance: Freelance): Observable<Freelance> {
        const copy = this.convert(freelance);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            this.convertItemFromServer(jsonResponse);
            return jsonResponse;
        });
    }

    update(freelance: Freelance): Observable<Freelance> {
        const copy = this.convert(freelance);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            this.convertItemFromServer(jsonResponse);
            return jsonResponse;
        });
    }

    find(id: number): Observable<Freelance> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            this.convertItemFromServer(jsonResponse);
            return jsonResponse;
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
        for (let i = 0; i < jsonResponse.length; i++) {
            this.convertItemFromServer(jsonResponse[i]);
        }
        return new ResponseWrapper(res.headers, jsonResponse, res.status);
    }

    private convertItemFromServer(entity: any) {
        entity.birthdate = this.dateUtils
            .convertLocalDateFromServer(entity.birthdate);
    }

    private convert(freelance: Freelance): Freelance {
        const copy: Freelance = Object.assign({}, freelance);
        copy.birthdate = this.dateUtils
            .convertLocalDateToServer(freelance.birthdate);
        return copy;
    }
}
