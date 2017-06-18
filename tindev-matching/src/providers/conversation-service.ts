import { Injectable } from '@angular/core';
import {Http, RequestOptions, URLSearchParams} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ApiUtils } from '../shared/utils/api';
import { Conversation } from '../shared/models/conversation';
import { Message } from '../shared/models/message';
import { User } from '../shared/models/user';

import 'rxjs/add/operator/map';
import {Mission} from "../shared/models/mission.model";
import {Freelance} from "../shared/models/freelance.model";
import {Discussion} from "../shared/models/discussion.model";
import {AuthService} from "./auth-service";

/*
 Generated class for the ConversationService provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class ConversationService {

    discussions: Array<Discussion> = [];
    currentDiscussion: Discussion;

    constructor(public http: Http, private apic: ApiUtils, private auth: AuthService) {
        console.log('Hello ConversationService Provider');
    }

    public createDiscussion(freelance: Freelance, mission: Mission) {
        let discussion: Discussion = {
            freelance: freelance,
            mission: mission
        }
        let headers = this.apic.getHeadersWithToken(this.auth.currentUser.token);
        let options = new RequestOptions({ headers: headers });
        let self = this;
        return this.http.post(this.apic.base_url + "discussions", discussion, options).map(function() {
            self.discussions.push(discussion);
            return discussion;
        });
    }

    public getAll() {
        let headers = this.apic.getHeadersWithToken(this.auth.token);
        let options = new RequestOptions({ headers: headers});
        let self = this;
        return this.http.get(this.apic.base_url + 'discussions2', options).toPromise().then(function(discussions) {
            debugger;
            self.discussions = discussions.json() as Discussion[];
        });
    }

}
