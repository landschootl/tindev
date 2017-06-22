import { Injectable } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import { ApiUtils } from '../shared/utils/api';
import { Mission } from '../shared/models/mission';
import { AuthService } from './auth-service';

import 'rxjs/add/operator/map';
import {Observable} from "rxjs/Observable";

/*
 Generated class for the MissionService provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class RecruiterService {

    constructor(public http: Http, private apic: ApiUtils, private auth: AuthService) {
        console.log('Hello FreelanceService Provider');
    }

    findMissionsByRecruiter(idRecruiter: any) {
        let headers = this.apic.getHeadersWithToken(this.auth.currentUser.token);
        let options = new RequestOptions({ headers: headers });
        return this.http.get(this.apic.base_url + 'recruiters/' + idRecruiter + '/missions', options)
            .map(function(response) {
            return response.json();
        });
    }
}
