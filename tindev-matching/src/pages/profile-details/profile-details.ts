import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {NavigationService} from "../../providers/navigation-service";
import {FreelanceService} from "../../providers/freelance-service";
import {RecruiterService} from "../../providers/recruiter-service";
import {Matching} from "../../shared/models/matching.model";
import {AuthService} from "../../providers/auth-service";
import {UserProfile} from "../../shared/models/user-profile.model";

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
    userProfile : UserProfile;
    spec_data : any = {};

    constructor(public navCtrl: NavController, public navParams: NavParams, private navService : NavigationService, private auth:AuthService,
    private free : FreelanceService, private rec : RecruiterService) {
        this.matching = this.navService.concernedProfile;
        if(this.auth.currentUser.recruiter)
          this.userProfile = this.matching.freelanceProfile;
        else 
          this.userProfile = this.matching.missionProfile;
        this.loadSpecData();
    }

    ionViewDidLoad() {
      console.log(this.matching);
    }

    getTitle() {
        if(this.auth.currentUser.recruiter)
            return this.userProfile.firstname + ' ' + this.userProfile.lastname;
        else
            return this.matching.mission.title;
    }

/*
findExperiencesByFreelance(idFreelance: any) {
        return this.http.get('api/freelances/' + idFreelance + '/experiences')
            .map((res: any) => res);
    }

    findTrainingsByFreelance(idFreelance: any) {
        return this.http.get('api/freelances/' + idFreelance + '/trainings')
            .map((res: any) => res);
    }

    findSkillsByFreelance(idFreelance: any) {
        return this.http.get('api/freelances/' + idFreelance + '/skills')
            .map((res: any) => res);
    }
*/

    loadSpecData() {
      if(this.auth.currentUser.recruiter) {
        this.free.findExperiencesByFreelance(this.matching.freelance.id).subscribe(exp => this.spec_data.experiences = exp);
        this.free.findTrainingsByFreelance(this.matching.freelance.id).subscribe(tr => this.spec_data.trainings = tr);
        this.free.findSkillsByFreelance(this.matching.freelance.id).subscribe(skills => this.spec_data.skills = skills);
      } else {
        this.rec.findMissionsByRecruiter(this.matching.mission.recruiter.id).subscribe(missions => this.spec_data.missions = missions);
      }
      console.log(this.matching);
    }

    renderFreelanceSkills() {
      var result : string = '';
      var i = 0;
      for(let s of this.spec_data.skills) {
        i++;
        result += s.name;
        if(i < this.spec_data.skills.length) {
          result += ', ';
        }
      }
      return result;
    }
    /*
    loadSpecData() {

    }*/
}
