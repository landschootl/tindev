import { Component } from '@angular/core';
import { NavController, NavParams , AlertController, LoadingController, Loading} from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { TindevSession } from '../../providers/tindev-session';
import { MatchingPage } from '../../pages/matching/matching';


@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {

  loading: Loading;
  //registerCredentials = { email: '', password: '' };
  registerCredentials = { lastname: '', firstname: '', recruiter: false, email: '', password: '' };

  constructor(public nav: NavController, public navParams: NavParams, public tindevSession: TindevSession, private auth: AuthService,private alertCtrl: AlertController, private loadingCtrl: LoadingController) {
    this.tindevSession = tindevSession;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  public signin() {
    this.showLoading();
    //Il faudra enlever le parametre false quand ce sera gardé dans un user
    this.auth.register(this.registerCredentials).subscribe(allowed => {
      if (allowed) {        
        this.nav.setRoot(MatchingPage);
        this.loading.dismiss();
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
