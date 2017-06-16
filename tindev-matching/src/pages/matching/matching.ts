import { Component, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { SwingStackComponent, StackConfig, SwingCardComponent, ThrowEvent } from 'angular2-swing';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { ToastController } from 'ionic-angular';
import { CapitalizePipe } from '../../shared/pipes/capitalize.pipe';
import { AuthService } from '../../providers/auth-service';
import { MatchingService } from "../../providers/matching-service";
import { Matching } from '../../shared/models/matching.model';

@Component({
    selector: 'page-matching',
    templateUrl: 'matching.html',
    providers: [CapitalizePipe]
})
export class MatchingPage {

    @ViewChild('myswing1') swingStack: SwingStackComponent;
    @ViewChildren('mycards1') swingCards: QueryList<SwingCardComponent>;

    matchings: Array<Matching> = [];
    stackConfig: StackConfig;
    currentCard: any;

    constructor(private http: Http,
        private toastCtrl: ToastController,
        private capitalizePipe: CapitalizePipe,
        private auth: AuthService,
        private matchingService: MatchingService) {
        this.stackConfig = {
            throwOutConfidence: (offsetX, offsetY, element) => {
                return Math.min(Math.abs(offsetX) / (element.offsetWidth / 2), 1);
            },
            throwOutDistance: (d) => {
                return 800;
            }
        };
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

    voteUp(like: boolean) {
        this.matchingService.save(this.currentCard, like);
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

    private showCard(matching: any) {

    }

    private showNoCardAnyMore() {

    }

    private calculateAge(b: any) {
        let birthday = new Date(b.replace(' ', 'T'));
        let ageDifMs = Date.now() - birthday.getTime();
        let ageDate = new Date(ageDifMs);
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    }

}
