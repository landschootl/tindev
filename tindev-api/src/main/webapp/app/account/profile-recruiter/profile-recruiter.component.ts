import {Component, Input, OnChanges, OnInit, SimpleChange} from "@angular/core";
import {Recruiter} from "../../entities/recruiter/recruiter.model";
import {RecruiterService} from "../../entities/recruiter/recruiter.service";
import {UserProfileService} from "../../entities/user-profile/user-profile.service";
import {ActivatedRoute} from "@angular/router";
import {JhiLanguageService} from "ng-jhipster";
import {UserProfile} from "../../entities/user-profile/user-profile.model";

@Component({
  selector: 'jhi-profile-recruiter',
  templateUrl: './profile-recruiter.component.html',
    styleUrls: [
        'profile-recruiter.scss'
    ]
})
export class ProfileRecruiterComponent implements OnInit, OnChanges {
    @Input() settingsAccount: any;

    userProfile: UserProfile;
    successEditUserProfile: boolean;
    errorEditUserProfile: string;

    recruiterProfile: Recruiter;
    successEditRecruiterProfile: boolean;
    errorEditRecruiterProfile: string;

    constructor(private jhiLanguageService: JhiLanguageService,
                private recruiterService: RecruiterService,
                private userProfileService: UserProfileService,
                private route: ActivatedRoute) {
        this.jhiLanguageService.setLocations(['userProfile']);
    }

    ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
        if (changes['settingsAccount']) {
            this.load(this.settingsAccount.id);
        }
    }

    ngOnInit(): void {

    }

    load(id) {
        this.userProfileService.find(id).subscribe(userProfile => {
            this.userProfile = userProfile;
        });
        this.recruiterService.findByIdUser(id).subscribe(recruiterProfile => {
            this.recruiterProfile = recruiterProfile;
        });
    }

    saveUserProfile() {
        this.userProfileService.update(this.userProfile)
            .subscribe(
                (res: UserProfile) => {
                    this.successEditUserProfile = true;
                    this.errorEditUserProfile = '';
                    this.userProfile = res;
                },
                (res: Response) => {
                    this.successEditUserProfile = false;
                    console.log('error => ', res);
                });
    }

    saveRecruiterProfile() {
        this.recruiterService.update(this.recruiterProfile)
            .subscribe(
                (res: Recruiter) => {
                    this.successEditRecruiterProfile = true;
                    this.errorEditRecruiterProfile = '';
                    this.recruiterProfile = res;
                },
                (res: Response) => {
                    this.successEditRecruiterProfile = false;
                    console.log('error => ', res);
                });
    }

    previousState() {
        window.history.back();
    }
}
