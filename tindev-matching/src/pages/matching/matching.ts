import { Component, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { StackConfig, SwingCardComponent, SwingStackComponent, ThrowEvent } from 'angular2-swing';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AlertController, NavController, NavParams, ToastController } from 'ionic-angular';
import { CapitalizePipe } from '../../shared/pipes/capitalize.pipe';
import { AuthService } from '../../providers/auth-service';
import { MatchingService } from '../../providers/matching-service';
import { Matching } from '../../shared/models/matching.model';
import { RecruitersMissionSelectionPage } from '../../pages/recruiters-mission-selection/recruiters-mission-selection';
import { ConversationService } from '../../providers/conversation-service';
import { ConversationPage } from '../conversation/conversation';

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
    currentCard: Matching; // TODO : should be in matching service

    constructor(private http: Http,
                private toastCtrl: ToastController,
                private capitalizePipe: CapitalizePipe,
                private auth: AuthService,
                public navParams: NavParams,
                private matchingService: MatchingService,
                private alertCtrl: AlertController,
                private discussionService: ConversationService,
                private nav: NavController) {
        this.stackConfig = {
            throwOutConfidence: (offsetX, offsetY, element) => {
                return Math.min(Math.abs(offsetX) / (element.offsetWidth / 2), 1);
            },
            throwOutDistance: (d) => {
                return 800;
            }
        };
        console.log("matching profile is : ");
        console.log(this.matchingService.currentMatchingUser);
        this.discussionService.getAll();
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
        let self = this;
        this.matchingService.save(this.currentCard, liked).then(function() {
            if(self.currentCard.freelanceVoted && self.currentCard.recruiterVoted && self.currentCard.freelanceLiked && self.currentCard.recruiterLiked) {
                let alert = self.alertCtrl.create({
                    title: 'It\'s a match !!',
                    message: 'Voulez vous commencer à parler ?',
                    buttons: [
                        {
                            text: 'Non',
                            role: 'cancel',
                            handler: () => {
                                self.nextCard();
                            }
                        },
                        {
                            text: 'Oui',
                            handler: () => {
                                self.discussionService.createDiscussion(self.currentCard.freelance, self.currentCard.mission).subscribe(function(discussion) {
                                    console.log(this);
                                    self.discussionService.currentDiscussion = discussion;
                                    self.nextCard();
                                    self.nav.push(ConversationPage);
                                });
                            }
                        }
                    ]
                });
                alert.present();
            } else {
                self.nextCard();
            }
        });
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

    goToMissionSelection() {
        this.nav.push(RecruitersMissionSelectionPage);
    }

    getCurrentUserImage() {
        // TODO : Implémenter les image des utilisateur
        if (this.auth.currentUser.recruiter) {
            return this.currentCard.freelanceProfile.photoUrl;
        } else {
            return this.currentCard.mission.photoUrl;
        }
    }

    getCurrentUserName(): string {
        if (this.auth.currentUser.recruiter) {
            // TODO: Renvoyer le nom du freelance
            let freelance = this.currentCard.freelanceProfile;
            return (freelance.firstname + ' ' + freelance.lastname) || this.currentCard.freelanceUser.login;
        } else {
            return this.currentCard.mission.title;
        }
    }

    getCurrentUserDescription(): string {
        if (this.auth.currentUser.recruiter) {
            // TODO: Renvoyer la description du freelance
            return this.currentCard.freelanceProfile.description;
        } else {
            return this.currentCard.mission.description;

        }
    }

    getCompletedProfile(): boolean {
        if (this.auth.currentUser) {
            return this.auth.getUserInfo().completedProfile;
        }
        return false;
    }

    isRecruiter(): boolean {
        if (this.auth.currentUser) {
            return this.auth.currentUser.recruiter;
        }
        return false;
    }
}
