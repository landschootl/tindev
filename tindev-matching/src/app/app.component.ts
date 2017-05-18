import { Component, ViewChild, ViewChildren } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { HomePage } from '../pages/home/home';
import { AuthService } from '../providers/auth-service';
import { MatchingPage } from '../pages/matching/matching';
import { RegisterPage } from '../pages/register/register';
//import { MatchesListPage } from '../pages/matches-list-page/matches-list-page';
import { Nav, Menu, NavController, NavParams , AlertController, LoadingController, Loading} from 'ionic-angular';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = HomePage;
  pages: Array<{title: string, component: any, icon: string}>;
  @ViewChild(Nav) nav:Nav;
  @ViewChild(Menu) menu:Menu;

  constructor(platform: Platform, private auth: AuthService) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();

      this.pages = [
      { title: 'Home', component: MatchingPage, icon:'home'},
      { title: 'Profile', component: HomePage, icon:'briefcase' },
      { title: 'Conversations', component: HomePage, icon:'chatboxes' }
    ];
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  logout() {
    this.auth.logout();
    this.menu.close();
    this.nav.setRoot(HomePage);
  }
}
