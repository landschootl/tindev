import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { UserProfile } from './user-profile.model';
import { UserProfileService } from './user-profile.service';

@Component({
    selector: 'jhi-user-profile-detail',
    templateUrl: './user-profile-detail.component.html'
})
export class UserProfileDetailComponent implements OnInit, OnDestroy {

    userProfile: UserProfile;
    private subscription: any;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private userProfileService: UserProfileService,
        private route: ActivatedRoute
    ) {
        this.jhiLanguageService.setLocations(['userProfile']);
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
    }

    load (id) {
        this.userProfileService.find(id).subscribe(userProfile => {
            this.userProfile = userProfile;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
