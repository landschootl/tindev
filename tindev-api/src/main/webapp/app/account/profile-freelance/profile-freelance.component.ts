import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChange} from '@angular/core';
import {UserProfile} from "../../entities/user-profile/user-profile.model";
import {JhiLanguageService} from "ng-jhipster";
import {UserProfileService} from "../../entities/user-profile/user-profile.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'jhi-profile-freelance',
  templateUrl: './profile-freelance.component.html',
  styles: ['profile-freelance.scss']
})
export class ProfileFreelanceComponent implements OnInit, OnDestroy, OnChanges {

    @Input() settingsAccount: any;
    userProfile: UserProfile;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private userProfileService: UserProfileService,
        private route: ActivatedRoute
    ) {
        this.jhiLanguageService.setLocations(['userProfile']);
    }

    ngOnChanges(changes: {[propertyName: string]: SimpleChange}) {
        console.log("changes");
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
    }

    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
    }

}
