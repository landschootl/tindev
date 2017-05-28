import { Component } from '@angular/core';
import { NavController, MenuController, NavParams , AlertController, LoadingController, Loading} from 'ionic-angular';
import { TindevSession } from '../../providers/tindev-session';
import { AuthService } from '../../providers/auth-service';
import { MatchingPage } from '../../pages/matching/matching';
import { ToastController } from 'ionic-angular';
import { RegisterPage } from '../../pages/register/register';

@Component({
  selector: 'home',
  templateUrl: 'home.html'
})
export class HomePage {

  loading: Loading;
  registerCredentials = { username: 'user', password: 'user'};

  constructor(public nav: NavController, public navParams: NavParams, 
    public tindevSession: TindevSession, private auth: AuthService,
    private alertCtrl: AlertController, private loadingCtrl: LoadingController, 
    private menu: MenuController, private toastCtrl : ToastController) {
    this.tindevSession = tindevSession;
    this.menu.enable(false);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage. tindevSession : ' + this.tindevSession.isDevMode());
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
          //showToast('Welcome ' + user.firstname);
          let toast = this.toastCtrl.create({
            message: 'Welcome ' + user.firstname,
            duration: 2000,
            position: 'bottom'
          });
          toast.present(toast);
          this.menu.enable(true);
          this.nav.setRoot(MatchingPage);
          });
      } else {
        this.loading.dismiss();
        this.showToast("Invalid credentials");
      }
    },
      error => {
        this.loading.dismiss();
        this.showToast("Invalid credentials");
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