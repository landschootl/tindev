import { Component } from '@angular/core';
import { Loading, LoadingController, NavController, NavParams, ToastController } from 'ionic-angular';
import { MissionService } from '../../providers/mission-service';
import { Mission } from '../../shared/models/mission';
import { AuthService } from '../../providers/auth-service';
import { MatchingPage } from '../../pages/matching/matching';
import { MatchingService } from '../../providers/matching-service';
import { NavigationService } from '../../providers/navigation-service';


@Component({
    selector: 'recruiters-mission-selection',
    templateUrl: 'recruiters-mission-selection.html'
})
export class RecruitersMissionSelectionPage {
    loading: Loading;
    data: Array<Mission>;
    searchMatchingData: Array<Mission>;
    searchinput: string = '';
    showSearchLoader: boolean = false;
    interval: any;

    constructor(public navCtrl: NavController, public navParams: NavParams, private loadingCtrl: LoadingController,
        private toastCtrl: ToastController, private mission: MissionService, private auth: AuthService, private matchingService: MatchingService, private navService : NavigationService) {
    }

    ionViewDidEnter() {
        if (this.auth.currentUser.specId != undefined) {
            this.initializeItems();
        }
    }

    initializeItems() {
        this.showLoading();
        this.mission.apiGetMissionsForRecruiter().subscribe(data => {
                this.data = data;
                this.searchMatchingData = data;
                // this.loading.dismiss();
            },
            error => {
                // this.loading.dismiss();
                this.showToast("Impossible de récupérer vos missions");
            });
    }

    public showToast(text) {
        let toast = this.toastCtrl.create({
            message: text,
            duration: 2000,
            position: 'bottom',
            showCloseButton: true,
            closeButtonText: "Réessayer"
        });
        // toast.onDidDismiss(() => {
        //     // this.initializeItems();
        // });
        toast.present(toast);
    }

    showLoading() {
        this.loading = this.loadingCtrl.create({
            content: 'Récupération de vos mission...',
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

    openMatchingPage(m: Mission) {
        this.matchingService.currentMatchingUser = m;
        var target = this.navService.currentTarget;
        this.navService.currentTarget = undefined;
        this.navCtrl.setRoot(target);
    }

    shouldShow(mission: Mission) {
        return mission.title.toLowerCase().includes(this.searchinput.toLowerCase())
            || mission.description.toLowerCase().includes(this.searchinput.toLowerCase());
    }
}
