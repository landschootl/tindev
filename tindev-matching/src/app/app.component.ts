import { Component, ViewChild } from '@angular/core';
import { Menu, Nav, Platform } from 'ionic-angular';
import { Splashscreen, StatusBar } from 'ionic-native';
import { HomePage } from '../pages/home/home';
import { AuthService } from '../providers/auth-service';
import { MatchingPage } from '../pages/matching/matching';
import { MatchesListPage } from '../pages/matches-list/matches-list';


@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    rootPage = HomePage;
    pages: Array<{ title: string, component: any, icon: string }>;
    @ViewChild(Nav) nav: Nav;
    @ViewChild(Menu) menu: Menu;

    constructor(platform: Platform, private auth: AuthService) {
        platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            StatusBar.styleDefault();
            Splashscreen.hide();

            this.pages = [
                { title: 'Accueil', component: MatchingPage, icon: 'home' },
                { title: 'Profil', component: HomePage, icon: 'briefcase' },
                { title: 'Conversations', component: MatchesListPage, icon: 'chatboxes' }
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
