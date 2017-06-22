import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {NavigationService} from "../../providers/navigation-service";
import {Matching} from "../../shared/models/matching.model";
import {AuthService} from "../../providers/auth-service";

/*
  Generated class for the ProfileDetailsPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-profile-details',
  templateUrl: 'profile-details.html'
})
export class ProfileDetailsPage{
    matching: Matching;

    constructor(public navCtrl: NavController, public navParams: NavParams, private navService : NavigationService, private auth:AuthService) {
        this.matching = this.navService.concernedProfile;
    }

    ionViewDidLoad() {

    }

    getTitle() {
        if(this.auth.currentUser.recruiter)
            return this.matching.freelanceProfile.firstname + ' ' + this.matching.freelanceProfile.lastname;
        else
            return this.matching.mission.title;
    }

}
