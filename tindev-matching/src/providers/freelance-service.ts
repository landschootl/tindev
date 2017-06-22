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
export class FreelanceService {

    constructor(public http: Http, private apic: ApiUtils, private auth: AuthService) {
        console.log('Hello FreelanceService Provider');
    }

    public findExperiencesByFreelance(idFreelance: any) {
        let headers = this.apic.getHeadersWithToken(this.auth.currentUser.token);
        let options = new RequestOptions({ headers: headers });
        return this.http.get(this.apic.base_url + 'freelances/' + idFreelance + '/experiences', options)
            .map(function(response) {
            return response.json();
        });
    }

    public findTrainingsByFreelance(idFreelance: any) {
        let headers = this.apic.getHeadersWithToken(this.auth.currentUser.token);
        let options = new RequestOptions({ headers: headers });
        return this.http.get(this.apic.base_url + 'freelances/' + idFreelance + '/trainings', options)
            .map(function(response) {
            return response.json();
        });
    }

    public findSkillsByFreelance(idFreelance: any) {
        let headers = this.apic.getHeadersWithToken(this.auth.currentUser.token);
        let options = new RequestOptions({ headers: headers });
        return this.http.get(this.apic.base_url + 'freelances/' + idFreelance + '/skills', options)
            .map(function(response) {
            return response.json();
        });
    }
}
