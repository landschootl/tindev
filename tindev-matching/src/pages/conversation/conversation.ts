import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
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
    fullConversation: Conversation;
    placeholderpicture = 'assets/images/user-picture-placeholder.jpg';

    constructor(public navCtrl: NavController, public navParams: NavParams, conv: ConversationService, public auth: AuthService) {
        this.fullConversation = conv.apiGetFullConversation(navParams.data.conversation);
        //console.log(this.auth);
        console.log(this.fullConversation);
    }

    ionViewDidLoad() {
        console.log('conversation did load');
    }

    isUsersMessage(message: Message) {
        if (message.email_sender == this.auth.getUserInfo().email) {
            return 'users_message';
        }
    }

}
