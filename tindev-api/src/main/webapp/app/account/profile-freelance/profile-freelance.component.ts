import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChange} from '@angular/core';
import {UserProfile} from "../../entities/user-profile/user-profile.model";
import {JhiLanguageService} from "ng-jhipster";
import {UserProfileService} from "../../entities/user-profile/user-profile.service";
import {ActivatedRoute} from "@angular/router";
import {FreelanceService} from "../../entities/freelance/freelance.service";
import {Freelance} from "../../entities/freelance/freelance.model";

@Component({
  selector: 'jhi-profile-freelance',
  templateUrl: './profile-freelance.component.html',
  styleUrls: [
      'profile-freelance.scss'
  ]
})
export class ProfileFreelanceComponent implements OnInit, OnDestroy, OnChanges {

    @Input() settingsAccount: any;
    userProfile: UserProfile;
    freelanceProfile: Freelance;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private freelanceService: FreelanceService,
        private userProfileService: UserProfileService,
        private route: ActivatedRoute
    ) {
        this.jhiLanguageService.setLocations(['userProfile']);
    }

    ngOnChanges(changes: {[propertyName: string]: SimpleChange}) {
        if (changes['settingsAccount']) {
            this.load(this.settingsAccount.id);
        }
    }

    ngOnInit() {
    }

    load(id) {
        this.userProfileService.find(id).subscribe(userProfile => {
            this.userProfile = userProfile;
        });
        this.freelanceService.query("FROM freelance F WHERE F.idUser = "+id).subscribe(freelanceProfile => {
            this.freelanceProfile = freelanceProfile;
        });
    }

    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
    }

}
