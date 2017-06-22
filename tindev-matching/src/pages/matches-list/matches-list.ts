import { Component } from '@angular/core';
import { Loading, LoadingController, NavController, NavParams, ToastController } from 'ionic-angular';
import { Conversation } from '../../shared/models/conversation';
import { ConversationService } from '../../providers/conversation-service';
import { ConversationPage } from '../../pages/conversation/conversation';
import { Discussion } from '../../shared/models/discussion.model';
import { AuthService } from '../../providers/auth-service';
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

    constructor(public navCtrl: NavController, public navParams: NavParams, public conv: ConversationService, private loadingCtrl: LoadingController, private toastCtrl: ToastController, private auth: AuthService) {
    }
    ionViewDidEnter() {
        console.log('ionViewDidLoad MatchesListPage');
        this.initializeItems();
    }



    initializeItems() {
        this.showLoading();
        let self = this;
        return this.conv.getAll().catch(function () {
            self.loading.dismiss();
            self.showToast("We were unable to get your conversations");
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
        this.showSearchLoader = true;
    }

    shouldShow(d: Discussion) {
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

    getLastMessageContent(discussion: Discussion) {
        return '';
    }



}
