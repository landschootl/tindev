import { Injectable } from '@angular/core';
import { BaseRequestOptions, Http, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { Message } from './message.model';
import { DateUtils } from 'ng-jhipster';
@Injectable()
export class MessageService {

    private resourceUrl = 'api/messages';

    constructor(private http: Http, private dateUtils: DateUtils) { }

    create(message: Message): Observable<Message> {
        let copy: Message = Object.assign({}, message);
        copy.postingDate = this.dateUtils
            .convertLocalDateToServer(message.postingDate);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    update(message: Message): Observable<Message> {
        let copy: Message = Object.assign({}, message);
        copy.postingDate = this.dateUtils
            .convertLocalDateToServer(message.postingDate);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    find(id: number): Observable<Message> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            let jsonResponse = res.json();
            jsonResponse.postingDate = this.dateUtils
                .convertLocalDateFromServer(jsonResponse.postingDate);
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
            jsonResponse[i].postingDate = this.dateUtils
                .convertLocalDateFromServer(jsonResponse[i].postingDate);
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
