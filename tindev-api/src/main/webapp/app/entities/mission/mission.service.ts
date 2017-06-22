import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { DateUtils } from 'ng-jhipster';

import { Mission } from './mission.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class MissionService {

    private resourceUrl = 'api/missions';

    constructor(private http: Http, private dateUtils: DateUtils) { }

    create(mission: Mission): Observable<Mission> {
        const copy = this.convert(mission);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            this.convertItemFromServer(jsonResponse);
            return jsonResponse;
        });
    }

    update(mission: Mission): Observable<Mission> {
        const copy = this.convert(mission);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            this.convertItemFromServer(jsonResponse);
            return jsonResponse;
        });
    }

    find(id: number): Observable<Mission> {
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
        entity.startDate = this.dateUtils
            .convertLocalDateFromServer(entity.startDate);
        entity.endDate = this.dateUtils
            .convertLocalDateFromServer(entity.endDate);
    }

    private convert(mission: Mission): Mission {
        const copy: Mission = Object.assign({}, mission);
        copy.startDate = this.dateUtils
            .convertLocalDateToServer(mission.startDate);
        copy.endDate = this.dateUtils
            .convertLocalDateToServer(mission.endDate);
        return copy;
    }

    findByRecruiter(idRecruiter: any): Observable<Response> {
        return this.http.get(`api/recruiters/${idRecruiter}/missions`)
            .map((res: any) => res);
    }
}
