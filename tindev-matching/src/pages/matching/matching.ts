import { Component, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { SwingStackComponent, StackConfig, SwingCardComponent, ThrowEvent } from 'angular2-swing';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { ToastController, NavParams, NavController} from 'ionic-angular';
import { CapitalizePipe } from '../../shared/pipes/capitalize.pipe';
import { AuthService } from '../../providers/auth-service';
import { RecruitersMissionSelectionPage } from '../../pages/recruiters-mission-selection/recruiters-mission-selection';

@Component({
  selector: 'page-matching',
  templateUrl: 'matching.html',
  providers: [CapitalizePipe]
})
export class MatchingPage {

  @ViewChild('myswing1') swingStack: SwingStackComponent;
  @ViewChildren('mycards1') swingCards: QueryList<SwingCardComponent>;
  matchingProfile : any; //Could be user or mission
  cards: Array<any>;
  stackConfig: StackConfig;

  constructor(private http: Http,
    private toastCtrl: ToastController,
    private capitalizePipe: CapitalizePipe,
    private auth: AuthService, public navParams: NavParams, public nav : NavController) {
    console.log(navParams.data.mission);
    if(navParams.data.mission != undefined)
      this.matchingProfile = navParams.data.mission;
    else
      this.matchingProfile = auth.currentUser;
    console.log("matching profile is : ");
    console.log(this.matchingProfile);
    this.stackConfig = {
      throwOutConfidence: (offset, element) => {
        return Math.min(Math.abs(offset) / (element.offsetWidth/2), 1);
      },
      throwOutDistance: (d) => {
        return 800;
      }
    };
  }

  ngAfterViewInit() {
    if(this.auth.getUserInfo().completedProfile) {
      this.swingStack.throwin.subscribe((event: ThrowEvent) => {
        event.target.style.background = '#ffffff';
      });

      this.cards = [];
      this.addNewCards(1);
    }
  }

  voteUp(like: boolean) {
    let removedCard = this.cards.pop();
    let message: string;
    this.addNewCards(1);

    if (like) {
      message = 'YES : ' + this.capitalizePipe.transform(removedCard.name.first) + ' :)';
    } else {
      message = 'NO : ' + this.capitalizePipe.transform(removedCard.name.first) + ' :(';
    }

    let toast = this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: 'bottom'
    });
    toast.present(toast);
  }

  addNewCards(count: number) {
    this.http.get('https://randomuser.me/api/?results=' + count)
      .map(data => data.json().results)
      .subscribe(result => {
        for (let val of result) {
          val.age = this.calculateAge(val.dob);
          this.cards.push(val);
        }
      })
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
