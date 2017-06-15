import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { ApiUtils } from '../shared/utils/api';

@Injectable()
export class UserService {

    constructor(private http: Http, private apic : ApiUtils) {}

    public save(account: any): Observable<any> {
    	console.log(account);
        return this.http.post(this.apic.base_url + 'register', account);
    }
}
