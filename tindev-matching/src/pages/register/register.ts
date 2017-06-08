import { Component } from '@angular/core';
import {
    AlertController, Loading, LoadingController, MenuController, NavController, NavParams,
    ToastController
} from 'ionic-angular';
import { TindevSession } from '../../providers/tindev-session';
import { MatchingPage } from '../../pages/matching/matching';
import { UserService } from '../../providers/user-service';
import { AuthService } from '../../providers/auth-service';


@Component({
    selector: 'page-register',
    templateUrl: 'register.html'
})
export class RegisterPage {

    loading: Loading;
    registerAccount: any;
    recruiter: boolean;
    confirmPassword: string;

    constructor(public nav: NavController,
        public navParams: NavParams,
        public tindevSession: TindevSession,
        private toastCtrl: ToastController,
        private menu: MenuController,
        private alertCtrl: AlertController,
        private loadingCtrl: LoadingController,
        private userService: UserService,
        private authService: AuthService) {
        this.recruiter = false;
        this.tindevSession = tindevSession;
        this.registerAccount = {};
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad RegisterPage');
    }

    public register() {
        this.showLoading();

        if (this.confirmPassword !== this.registerAccount.password) {
            this.showError('Vos mots de passe sont différents !');
        } else if (this.registerAccount.password.length < 5) {
            this.showError('Votre mot de passe doit avoir 5 caractères au minimum.');
        } else {
            if (this.recruiter) {
                this.registerAccount.authorities = ["ROLE_RECRUITER"];
            } else {
                this.registerAccount.authorities = ["ROLE_FREELANCE"];
            }

            this.userService.save(this.registerAccount).subscribe(() => {
                this.authService.apiAuthenticate({username: this.registerAccount.login, password: this.registerAccount.password}).subscribe(allowed => {
                    if (allowed) {
                        this.authService.apiAccount().subscribe(user => {
                            let toast = this.toastCtrl.create({
                                message: 'Bienvenue ' + user.firstname,
                                duration: 2000,
                                position: 'bottom'
                            });
                            toast.present(toast);
                            this.menu.enable(true);
                            this.nav.setRoot(MatchingPage);
                            this.loading.dismiss();
                        });
                    }
                },
                error => {
                    this.loading.dismiss();
                    this.showError(error);
                });
            },
            error => {
                this.loading.dismiss();
                this.showError(error);
            });
        }
    }

    showLoading() {
        this.loading = this.loadingCtrl.create({
            content: 'Please wait...',
        });
        this.loading.present();
    }

    showError(text) {
        let alert = this.alertCtrl.create({
            title: 'Attempt failed',
            subTitle: text,
            buttons: ['OK']
        });
        alert.present(prompt);

        this.loading.dismiss();
    }
}
