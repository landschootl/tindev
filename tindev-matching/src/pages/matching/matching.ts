import { Component, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { StackConfig, SwingCardComponent, SwingStackComponent, ThrowEvent } from 'angular2-swing';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { CapitalizePipe } from '../../shared/pipes/capitalize.pipe';
import { AuthService } from '../../providers/auth-service';
import { MatchingService } from '../../providers/matching-service';
import { Matching } from '../../shared/models/matching.model';
import { RecruitersMissionSelectionPage } from '../../pages/recruiters-mission-selection/recruiters-mission-selection';

@Component({
    selector: 'page-matching',
    templateUrl: 'matching.html',
    providers: [CapitalizePipe]
})
export class MatchingPage {
    @ViewChild('myswing1') swingStack: SwingStackComponent;
    @ViewChildren('cards') cards: QueryList<SwingCardComponent>;

    matchingProfile: any; //Could be user or mission
    matchings: Array<Matching> = [];
    stackConfig: StackConfig;
    currentCard: Matching;

    constructor(private http: Http,
        private toastCtrl: ToastController,
        private capitalizePipe: CapitalizePipe,
        private auth: AuthService,
        public navParams: NavParams,
        public nav: NavController,
        private matchingService: MatchingService) {
        // this.stackConfig = {
        //     throwOutConfidence: (offsetX, offsetY, element) => {
        //         return Math.min(Math.abs(offsetX) / (element.offsetWidth / 2), 1);
        //     },
        //     throwOutDistance: (d) => {
        //         return 800;
        //     }
        // };
        console.log(navParams.data.mission);
        if (navParams.data.mission != undefined) {
            this.matchingProfile = navParams.data.mission;
        } else {
            this.matchingProfile = auth.currentUser;
        }
        console.log("matching profile is : ");
        console.log(this.matchingProfile);
    }

    ngAfterViewInit() {
        if (this.auth.getUserInfo().completedProfile) {
            this.swingStack.throwin.subscribe((event: ThrowEvent) => {
                event.target.style.background = '#ffffff';
            });
            this.matchings = [];
            this.nextCard();
        }
    }

    voteUp(liked: boolean) {
        this.matchingService.save(this.currentCard, liked);
        this.nextCard();
    }

    nextCard() {
        if (!this.matchings.length) {
            this.matchingService.getAll().then((data) => {
                this.matchings = data;
                this.currentCard = this.matchings.length ? this.matchings.shift() : null;
            });
        } else {
            this.currentCard = this.matchings.length ? this.matchings.shift() : null;
        }
    }

    private calculateAge(b: any) {
        let birthday = new Date(b.replace(' ', 'T'));
        let ageDifMs = Date.now() - birthday.getTime();
        let ageDate = new Date(ageDifMs);
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    }

    goToMissionSelection() {
        this.nav.push(RecruitersMissionSelectionPage);
    }

}
