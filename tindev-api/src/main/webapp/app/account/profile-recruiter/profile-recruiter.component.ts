import {Component, Input, OnChanges, OnInit, SimpleChange} from "@angular/core";
import { Response } from '@angular/http';
import {Recruiter} from "../../entities/recruiter/recruiter.model";
import {RecruiterService} from "../../entities/recruiter/recruiter.service";
import {UserProfileService} from "../../entities/user-profile/user-profile.service";
import {ActivatedRoute} from "@angular/router";
import {EventManager, JhiLanguageService} from "ng-jhipster";
import {UserProfile} from "../../entities/user-profile/user-profile.model";
import {Mission} from "../../entities/mission/mission.model";
import {MissionService} from "../../entities/mission/mission.service";
import {Subscription} from "rxjs/Subscription";

@Component({
    selector: 'jhi-profile-recruiter',
    templateUrl: './profile-recruiter.component.html',
    styleUrls: [
        'profile-recruiter.scss'
    ]
})
export class ProfileRecruiterComponent implements OnInit, OnChanges {
    @Input() settingsAccount: any;
    @Input() userProfile: UserProfile;
    eventSubscriber: Subscription;
    recruiterProfile: Recruiter;
    missions: Mission[];
    newMission: Mission;

    constructor(private jhiLanguageService: JhiLanguageService,
                private recruiterService: RecruiterService,
                private userProfileService: UserProfileService,
                private missionService: MissionService,
                private eventManager: EventManager,
                private route: ActivatedRoute) {
        this.jhiLanguageService.setLocations(['userProfile']);
    }

    ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
        if (changes['settingsAccount']) {
            this.load(this.settingsAccount.id);
        }
    }

    ngOnInit(): void {
        this.newMission = new Mission();
        this.registerChangeInMissions();
    }

    load(id) {
        this.recruiterService.findByIdUser(id).subscribe(recruiterProfile => {
            this.recruiterProfile = recruiterProfile;
            this.loadMissions(recruiterProfile.id);
            this.newMission.recruiter = recruiterProfile;
        });
    }

    loadMissions(idRecruiter){
        this.missionService.findByRecruiter(idRecruiter).subscribe(
            (res: Response) => {
                this.missions = res.json();
            });
    }

    registerChangeInMissions() {
        this.eventSubscriber = this.eventManager.subscribe('missionListModification', (response) => this.loadMissions(this.recruiterProfile.id));
    }

    saveUserProfile() {
        this.userProfileService.update(this.userProfile)
            .subscribe(
                (res: UserProfile) => {

                },
                (res: Response) => {
                    console.log('error => ', res);
                });
    }

    saveRecruiterProfile() {
        this.recruiterService.update(this.recruiterProfile)
            .subscribe(
                (res: Recruiter) => {
                    this.recruiterProfile = res;
                },
                (res: Response) => {
                    console.log('error => ', res);
                });
    }

    previousState() {
        window.history.back();
    }
}
