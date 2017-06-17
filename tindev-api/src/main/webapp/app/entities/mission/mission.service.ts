import { Injectable } from '@angular/core';
import { BaseRequestOptions, Http, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Mission } from './mission.model';
import { DateUtils } from 'ng-jhipster';

@Injectable()
export class MissionService {

    private resourceUrl = 'api/missions';

    constructor(private http: Http, private dateUtils: DateUtils) { }

    create(mission: Mission): Observable<Mission> {
        let copy: Mission = Object.assign({}, mission);
        copy.startDate = this.dateUtils
            .convertLocalDateToServer(mission.startDate);
        copy.endDate = this.dateUtils
            .convertLocalDateToServer(mission.endDate);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    update(mission: Mission): Observable<Mission> {
        let copy: Mission = Object.assign({}, mission);
        copy.startDate = this.dateUtils
            .convertLocalDateToServer(mission.startDate);
        copy.endDate = this.dateUtils
            .convertLocalDateToServer(mission.endDate);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    find(id: number): Observable<Mission> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            let jsonResponse = res.json();
            jsonResponse.startDate = this.dateUtils
                .convertLocalDateFromServer(jsonResponse.startDate);
            jsonResponse.endDate = this.dateUtils
                .convertLocalDateFromServer(jsonResponse.endDate);
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
            jsonResponse[i].startDate = this.dateUtils
                .convertLocalDateFromServer(jsonResponse[i].startDate);
            jsonResponse[i].endDate = this.dateUtils
                .convertLocalDateFromServer(jsonResponse[i].endDate);
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

    findByRecruiter(idRecruiter: any): Observable<Response> {
        return this.http.get(`api/recruiters/${idRecruiter}/missions`)
            .map((res: any) => this.convertResponse(res));
    }
}
