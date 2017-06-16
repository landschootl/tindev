import { Injectable } from '@angular/core';
import {Http, Response, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { ApiUtils } from '../shared/utils/api';

@Injectable()
export class UserService {

    constructor(private http: Http, private apic : ApiUtils) {}

    public save(account: any): Observable<any> {
    	console.log(account);
        return this.http.post(this.apic.base_url + 'register', account);
    }

    public getRecruitersIdForUser(id : number, token : any) {
    	
    	let headers = this.apic.getHeadersWithToken(token);
    	let options = new RequestOptions({headers:headers});
    	return this.http.get(this.apic.base_url + 'users/' + id + '/recruiters', options)
    .map((response:Response) => {
      let recruiterid = response.json().id;
        return recruiterid;
      })
    }
}
