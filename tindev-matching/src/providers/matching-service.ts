import { Injectable } from '@angular/core';
import { Http, RequestOptions, URLSearchParams } from '@angular/http';
import { ApiUtils } from '../shared/utils/api';
import { AuthService } from './auth-service';
import 'rxjs/add/operator/toPromise';
import { ToastController } from 'ionic-angular';
import {Matching} from "../shared/models/matching.model";

@Injectable()
export class MatchingService {

    currentMatchingUser: any;

    constructor(private http: Http,
        private apic: ApiUtils,
        private auth: AuthService,
        private toastCtrl: ToastController) {
    }

    // public vote(Matching matching) {
    //     return this.http.put(this.apic.base_url + 'matching/save', matching);
    // }

    public getAll() {
        let headers = this.apic.getHeadersWithToken(this.auth.token);
        let params = new URLSearchParams();
        params.set('id', this.currentMatchingUser.id);
        let options = new RequestOptions({ headers: headers, search: params });
        if (this.auth.currentUser.recruiter) {
            return this.http.get(this.apic.base_url + 'matchings/best', options).toPromise().then(function(data) {
                return data.json();
            });
        } else {
            return this.http.get(this.apic.base_url + 'matchings/best', options).toPromise().then(function(data) {
                return data.json();
            });

        }
    }

    public getBestMatching() {
        let headers = this.apic.getHeadersWithToken(this.auth.token);
        let options = new RequestOptions({ headers: headers });
        return this.http.get(this.apic.base_url + 'matchings/best', options).toPromise().then(function(data) {
        });
    }

    public save(matching: Matching, liked: boolean) {
        if (this.auth.currentUser.recruiter) {
            matching.recruiterLiked = liked;
            matching.recruiterVoted = true;
        } else {
            matching.freelanceLiked = liked;
            matching.freelanceVoted = true;
        }
        let headers = this.apic.getHeadersWithToken(this.auth.token);
        let options = new RequestOptions({ headers: headers });
        return this.http.put(this.apic.base_url + 'matchings', matching, options).toPromise().then(function(data) {
        });
    }
}
