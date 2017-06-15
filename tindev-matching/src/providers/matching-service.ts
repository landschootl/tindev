import { Injectable } from '@angular/core';
import {Http, RequestOptions, Response} from '@angular/http';
import { ApiUtils } from '../shared/utils/api';
import {AuthService} from "./auth-service";
import 'rxjs/add/operator/toPromise';

@Injectable()
export class MatchingService {

    constructor(private http: Http, private apic : ApiUtils, private auth: AuthService) {}

    // public vote(Matching matching) {
    //     return this.http.put(this.apic.base_url + 'matching/save', matching);
    // }

    public getBestMatching() {
        let headers = this.apic.getHeadersWithToken(this.auth.token);
        let options = new RequestOptions({headers:headers});
        /*return this.http.get(this.apic.base_url + 'matchings/best', options).toPromise().then(function(data) {
        });*/
    }
}
