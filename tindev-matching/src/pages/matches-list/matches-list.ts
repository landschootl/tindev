import { Component } from '@angular/core';
import { Loading, LoadingController, NavController, NavParams, ToastController } from 'ionic-angular';
import { Conversation } from '../../shared/models/conversation';
import { ConversationService } from '../../providers/conversation-service';
import { ConversationPage } from '../../pages/conversation/conversation';
import { Discussion } from '../../shared/models/discussion.model';
import { Message } from '../../shared/models/message.model';
import { AuthService } from '../../providers/auth-service';
import { NavigationService } from '../../providers/navigation-service';
import { RecruitersMissionSelectionPage } from '../../pages/recruiters-mission-selection/recruiters-mission-selection';

/*
 Generated class for the MatchesList page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
    selector: 'page-matches-list',
    templateUrl: 'matches-list.html'
})
export class MatchesListPage {
    loading: Loading;
    data: Array<Conversation>;
    searchMatchingData: Array<Discussion>;
    searchinput: string = '';
    showSearchLoader: boolean = false;

    constructor(public navService : NavigationService, public navCtrl: NavController, public navParams: NavParams, public conv: ConversationService, private loadingCtrl: LoadingController, private toastCtrl: ToastController, private auth: AuthService) {
    }
    ionViewDidEnter() {
        console.log('ionViewDidLoad MatchesListPage');
        if(this.navService.bypass == true) {
            this.navService.bypass = false;
        } else if (this.auth.currentUser.recruiter) {
            this.navService.currentTarget = MatchesListPage;
            this.navService.bypass = true;
            this.navCtrl.push(RecruitersMissionSelectionPage);
        }
        this.initializeItems();
    }



    initializeItems() {
        this.showLoading();
        let self = this;
        return this.conv.getAll().catch(function () {
            self.loading.dismiss();
            self.showToast("Nous n'avons pas réussi à retrouver vos conversations.");
        });
    }

    public showToast(text) {
        let toast = this.toastCtrl.create({
            message: text,
            duration: 2000,
            position: 'bottom',
            showCloseButton: true,
            closeButtonText: "Retry"
        });
        toast.onDidDismiss(() => {
            this.initializeItems();
        });
        toast.present(toast);
    }

    showLoading() {
        this.loading = this.loadingCtrl.create({
            content: 'Retrieving conversations...',
            dismissOnPageChange: true
        });
        this.loading.present();
    }

    onSearchInput(event) {
        if(this.searchinput.length) {
            this.showSearchLoader = true;
        } else {
            this.showSearchLoader = false;
        }
    }

    shouldShow(d: Discussion) {
        if(!d.mission.title || !d.freelanceProfile || !d.freelanceProfile.firstname || !d.freelanceProfile.lastname ) {
            return true;
        }
        return d.mission.title.toLowerCase().includes(this.searchinput.toLowerCase())
            || this.getUserName(d).toLowerCase().includes(this.searchinput.toLowerCase())
    }

    openConversationPage(discussion: Discussion) {
        this.conv.currentDiscussion = discussion;
        this.navCtrl.push(ConversationPage);
    }

    getTitle(discussion: Discussion) {
        return discussion.mission.title;
        // if (this.auth.currentUser.recruiter) {
        //     // TODO: Renvoyer le nom du freelance
        //     let freelance = discussion.freelanceProfile;
        //     return (freelance.firstname + ' ' + freelance.lastname) || discussion.freelanceUser.login;
        //
        // } else {
        //
        // }
    }

    getUserName(discussion: Discussion) {
        if (this.auth.currentUser && this.auth.currentUser.recruiter) {
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

    getLastMessageContent(discussion: Discussion) {
        var m : Message = discussion.messages[discussion.messages.length-1];
        return this.conv.getSenderName(m) + ' : '  + m.textMessage;
    }



}
