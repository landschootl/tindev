import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {ApiUtils} from '../shared/utils/api';
import {Conversation} from '../shared/models/conversation';
import {Message} from '../shared/models/message';
import {User} from '../shared/models/user';

import 'rxjs/add/operator/map';

/*
  Generated class for the ConversationService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ConversationService {

  constructor(public http: Http, private apic : ApiUtils) {
    console.log('Hello ConversationService Provider');
  }


  public apiGetConversations() {
  	var data :Array<Conversation>;
  	data = [];

  	var mac = new Message('2017-05-18T13:58:23', "Hello Mr. I'm sending you this message in order to have a meeting with you because I think your profile is exactly what we need for our project", 'Ali Conners', 'ali.conners@tindev.com', 'user@localhost');
  	var cac = new Conversation('Chef de projet Big Data', 'Ali Conners',mac);
  	data.push(cac);

  	var mth = new Message('2017-05-18T13:57:23', "Hello Mr. I'm sending you this message in order to have a meeting with you because I think your profile is exactly what we need for our project", 'Trevor Jensen', 'trever.jensen@tindev.com', 'user@localhost');
  	var cth = new Conversation('Développeur mobile', 'Trevor Hansen',mth);
  	data.push(cth);

  	var msa = new Message('2017-05-18T13:57:22', "Hello Mr. I'm interested in your profile. Please contact my associate Mr Trevor Jensen", 'Sandra Adams', 'sandra.adams@tindev.com', 'user@localhost');
  	var csa = new Conversation('Développeur fullstack', 'Sandra Adams',msa);
  	data.push(csa);
  	return Observable.create(observer => {
  		observer.next(data);
  		observer.complete();
  	});
  }
  public apiGetFullConversation(c : Conversation) {
    var conversation :Conversation = c;
    var data : Array<Message>;
    data = [];
    for(var i =0; i<20; i++) {
      if(i%2 == 0) {
          data.push(new Message('2017-05-01T13:58:23', 'Hello this is the message number : ' + i, 'Ali Conners', 'ali.conners@tindev.com', 'user@localhost'));
        } else {
          data.push(new Message('2017-05-01T13:58:23', 'Hello this is the message number : ' + i, 'Tindev User','user@localhost', 'ali.conners@tindev.com'));
        }
    }

    var u : User = new User('Ali', 'Conners', true, 'ali.conners@tindev.com', true, '');
    conversation.messages = data;
    conversation.interlocutor = u;
    return conversation;
  }

}