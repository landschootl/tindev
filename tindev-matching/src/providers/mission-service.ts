import { Injectable } from '@angular/core';
import {Http, Response, RequestOptions} from '@angular/http';import {Observable} from 'rxjs/Observable';
import {ApiUtils} from '../shared/utils/api';
import {Mission} from '../shared/models/mission';
import {User} from '../shared/models/user';
import { AuthService } from './auth-service';

import 'rxjs/add/operator/map';

/*
  Generated class for the MissionService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class MissionService {

  constructor(public http: Http, private apic : ApiUtils, private auth : AuthService) {
    console.log('Hello MissionService Provider');
  }


///api/recruiters/{id}/missions
  public apiGetMissionsForRecruiter() : Observable<any> {
    //Get recruiters id
    let headers = this.apic.getHeadersWithToken(this.auth.currentUser.token);
    let options = new RequestOptions({headers:headers});
      return this.http.get(this.apic.base_url + 'recruiters/' + this.auth.currentUser.specId + '/missions', options)
      .map((response:Response) => {
        var data :Array<Mission>;
        data = [];
        let json = response.json();
        for (let jsonobject of json) {
          var m = new Mission(jsonobject.id, jsonobject.description, jsonobject.startDate, jsonobject.maxSalary, jsonobject.minSalary, this.auth.currentUser, jsonobject.endDate, jsonobject.title);
          data.push(m);
        }
        return data;
    });

/*
    //Get missionlist
  	var data :Array<Mission>;
  	data = [];
//  constructorpublic maxSalary : number, public minSalary : number, public recruiter : User, public startDate : string, public title : string) {

  	var M1 = new Mission(1,'Passionné de données et de programmation ?', '2017-05-01T13:58:23', 600, 400, u, '2017-05-01T13:58:23', 'Développeur big data');
    var M2 = new Mission(2,'Passionné de mobiles et de programmation ?', '2017-05-01T13:58:23', 600, 400, u, '2017-05-01T13:58:23', 'Développeur big data');
    var M3 = new Mission(3,'Passionné d\'angular et de programmation ?', '2017-05-01T13:58:23', 600, 400, u, '2017-05-01T13:58:23', 'Développeur big data');
  	
    data.push(M1);
    data.push(M2);
    data.push(M3);

    return Observable.create(observer => {
  		observer.next(data);
  		observer.complete();
  	});*/
  }
}