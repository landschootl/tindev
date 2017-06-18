import {Component, ViewChild} from '@angular/core';
import {Content, NavController, NavParams} from 'ionic-angular';
import { ConversationService } from '../../providers/conversation-service';
import { Conversation } from '../../shared/models/conversation';
import { AuthService } from '../../providers/auth-service';
import { Message } from '../../shared/models/message.model';

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
    fullConversation: Conversation;
    placeholderpicture = 'assets/images/user-picture-placeholder.jpg';
    private currentMessage: string;

    constructor(public navCtrl: NavController, public navParams: NavParams, private discussionService: ConversationService, public auth: AuthService) {
    }

    ionViewDidEnter() {
        console.log('conversation did load');
        this.scrollBottom();
    }

    isUsersMessage(message: Message) {
        // if (message.email_sender == this.auth.getUserInfo().email) {
        //     return 'users_message';
        // }

        return true;
    }

    getTitle() {
        return this.discussionService.currentDiscussion.mission.title;
    }

    getUserImage() {
        if(this.auth.currentUser.recruiter) {
            return this.discussionService.currentDiscussion.freelanceProfile.photoUrl;
        } else {
            return this.discussionService.currentDiscussion.missionProfile.photoUrl;
        }
    }

    getUserName() {
        let discussion = this.discussionService.currentDiscussion;
        if (this.auth.currentUser.recruiter) {
            // TODO: Renvoyer le nom du freelance
            let freelance = discussion.freelanceProfile;
            let text = freelance.firstname + freelance.lastname ? freelance.firstname + ' ' + freelance.lastname : discussion.freelanceUser.login;
            return text;

        } else {
            let recruiter = discussion.missionProfile;
            let text = recruiter.firstname + recruiter.lastname ? recruiter.firstname + ' ' + recruiter.lastname : discussion.missionUser.login;
            return text;
        }
    }

    public send() {
        //console.log("sending : " + this.currentMessage);
        //api add message
        if(!this.currentMessage) {
            return;
        }
        this.discussionService.saveMessage(this.currentMessage).subscribe(()=> {
            this.currentMessage = '';
            var that = this;
            setTimeout(function () {
                that.scrollBottom();
            }, 50);
        });

    }

    public scrollBottom() {
        // let dimensions = this.content.getContentDimensions();
        this.content.scrollToBottom();
    }

}
