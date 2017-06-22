import { Component } from '@angular/core';
import {
    AlertController,
    Loading,
    LoadingController,
    MenuController,
    NavController,
    NavParams,
    ToastController
} from 'ionic-angular';
import { TindevSession } from '../../providers/tindev-session';
import { AuthService } from '../../providers/auth-service';
import { Storage } from '@ionic/storage';
import { MatchingPage } from '../../pages/matching/matching';
import { RegisterPage } from '../../pages/register/register';
import { RecruitersMissionSelectionPage } from '../../pages/recruiters-mission-selection/recruiters-mission-selection';
import { MatchingService } from '../../providers/matching-service';

@Component({
    selector: 'home',
    templateUrl: 'home.html'
})
export class HomePage {

    loading: Loading;
    registerCredentials = { username: 'freelance', password: 'freelance' };

    constructor(public nav: NavController, public navParams: NavParams, private storage: Storage,
        public tindevSession: TindevSession, private auth: AuthService,
        private alertCtrl: AlertController, private loadingCtrl: LoadingController,
        private menu: MenuController, private toastCtrl: ToastController, private matchingService: MatchingService) {
        this.tindevSession = tindevSession;
        this.menu.enable(false);
    }

    ionViewDidLoad() {
        this.storage.get('currentUser').then((data: any) => {
            if (data) {
                this.login();
            }
        });
    }

    public createAccount() {
        this.nav.push(RegisterPage);
    }

    public login() {
        this.showLoading();
        //Il faudra enlever le parametre true quand ce sera gardé dans un user
        this.auth.apiAuthenticate(this.registerCredentials).subscribe(allowed => {
                if (allowed) {
                    //Authentication successful, now we can get the information from the newly logged user
                    this.auth.apiAccount().subscribe(user => {
                        let toast = this.toastCtrl.create({
                            message: 'Welcome ' + user.firstname,
                            duration: 2000,
                            position: 'bottom'
                        });
                        toast.present(toast);
                        this.menu.enable(true);
                        if (user.recruiter) {
                            this.nav.push(RecruitersMissionSelectionPage);
                        } else {
                            this.matchingService.currentMatchingUser = user;
                            this.nav.setRoot(MatchingPage);
                        }
                    });
                } else {
                    this.loading.dismiss();
                    this.showToast("Informations de connexion invalides");
                }
            },
            error => {
                this.loading.dismiss();
                this.showToast("Informations de connexion invalides");
            });
    }

    public showToast(text) {
        let toast = this.toastCtrl.create({
            message: text,
            duration: 2000,
            position: 'bottom'
        });
        toast.present(toast);
    }

    showLoading() {
        this.loading = this.loadingCtrl.create({
            content: 'Please wait...',
            dismissOnPageChange: true
        });
        this.loading.present();
    }
}
