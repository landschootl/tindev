import { Injectable } from '@angular/core';
import { Http, RequestOptions, URLSearchParams } from '@angular/http';
import { ApiUtils } from '../shared/utils/api';
import { Message } from '../shared/models/message.model';

import 'rxjs/add/operator/map';
import { Mission } from '../shared/models/mission.model';
import { Freelance } from '../shared/models/freelance.model';
import { Discussion } from '../shared/models/discussion.model';
import { AuthService } from './auth-service';
import { MatchingService } from './matching-service';

/*
 Generated class for the ConversationService provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class ConversationService {

    discussions: Array<Discussion> = [];
    currentDiscussion: Discussion;

    constructor(public http: Http, private apic: ApiUtils, private auth: AuthService, private matchingService : MatchingService) {
        console.log('Hello ConversationService Provider');
    }

    public createDiscussion(freelance: Freelance, mission: Mission) {
        let discussion: Discussion = {
            freelance: freelance,
            mission: mission
        };
        let headers = this.apic.getHeadersWithToken(this.auth.currentUser.token);
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.apic.base_url + "discussions", discussion, options).map((d) => {
            let disc = d.json() as Discussion;
            this.discussions.push(disc);
            return disc;
        });
    }

    public getAll() {
        let headers = this.apic.getHeadersWithToken(this.auth.token);
        let params = new URLSearchParams();
        params.set('id', this.matchingService.currentMatchingUser.id);
        let options = new RequestOptions({ headers: headers, search: params });
        return this.http.get(this.apic.base_url + 'discussions/byuser', options).toPromise().then((discussions) => {
            this.discussions = discussions.json() as Discussion[];
        });

    }

    saveMessage(currentMessage: string) {
        let message: Message = {
            textMessage: currentMessage,
            discussion: this.currentDiscussion,
            sender : {
                id: this.auth.currentUser.id
            }
        };
        let headers = this.apic.getHeadersWithToken(this.auth.currentUser.token);
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.apic.base_url + "messages", message, options).map((m) => {
            let mess = m.json() as Message;
            this.currentDiscussion.messages = this.currentDiscussion.messages || [];
            this.currentDiscussion.messages.push(mess);
            return mess;
        });
    }

    getSenderName(message: Message) {
        if(message.sender.id === this.auth.currentUser.id) {
            return 'Vous';
        } else {
            return message.sender.firstname + ' ' + message.sender.lastname;
        }
    }
}
