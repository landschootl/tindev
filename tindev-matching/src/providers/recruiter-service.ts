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
export class MissionService {

    constructor(public http: Http, private apic: ApiUtils, private auth: AuthService) {
        console.log('Hello FreelanceService Provider');
    }

    findMissionsByRecruiter(idRecruiter: any) {
        return this.http.get(`api/freelances/${idRecruiter}/missions`)
            .map((res: any) => res);
    }
}
