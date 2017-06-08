import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Content } from 'ionic-angular';
import { ConversationService } from '../../providers/conversation-service';
import { Conversation } from '../../shared/models/conversation';
import { AuthService } from '../../providers/auth-service';
import { Message } from '../../shared/models/message';

/*
  Generated class for the Conversation page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-conversation',
  templateUrl: 'conversation.html'
})
export class ConversationPage {
  @ViewChild(Content) content : Content;
  fullConversation : Conversation;
  currentMessage : string;
  placeholderpicture = 'assets/images/user-picture-placeholder.jpg';
  
  constructor(public navCtrl: NavController, public navParams: NavParams, conv : ConversationService, public auth : AuthService) {
  	this.fullConversation = conv.apiGetFullConversation(navParams.data.conversation);
  	//console.log(this.auth);
  	console.log(this.fullConversation);
  }

  ionViewDidEnter() {
    this.scrollBottom();
  }

  isUsersMessage(message : Message) {
  	if (message.email_sender == this.auth.getUserInfo().email) {
  		return 'users_message';
  	}
  }

  public send() {
    //console.log("sending : " + this.currentMessage);
    //api add message
    this.fullConversation.addMessage(this.auth.getUserInfo().email, this.currentMessage);
    this.currentMessage = '';
    var that = this;
    setTimeout(function () {
      that.scrollBottom();
      }, 50);
  }

  public scrollBottom() {
    let dimensions = this.content.getContentDimensions();
    this.content.scrollToBottom();
  }

}