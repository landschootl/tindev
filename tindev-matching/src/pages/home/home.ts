import { Component } from '@angular/core';
import { NavController, MenuController, NavParams , AlertController, LoadingController, Loading} from 'ionic-angular';
import { TindevSession } from '../../providers/tindev-session';
import { AuthService } from '../../providers/auth-service';
import { MatchingPage } from '../../pages/matching/matching';
import { RegisterPage } from '../../pages/register/register';

@Component({
  selector: 'home',
  templateUrl: 'home.html'
})
export class HomePage {

  loading: Loading;
  registerCredentials = { email: '', password: ''};

  constructor(public nav: NavController, public navParams: NavParams, 
    public tindevSession: TindevSession, private auth: AuthService,
    private alertCtrl: AlertController, private loadingCtrl: LoadingController, private menu: MenuController) {
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
    this.auth.login(this.registerCredentials).subscribe(allowed => {
      if (allowed) {        
        this.menu.enable(true);
        this.nav.setRoot(MatchingPage);
      } else {
        this.showError("Invalid credentials");
      }
    },
      error => {
        this.showError(error);
      });
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }
 
  showError(text) {
    this.loading.dismiss();
 
    let alert = this.alertCtrl.create({
      title: 'Attempt failed',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present(prompt);
  }

}