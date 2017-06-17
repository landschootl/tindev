import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AlertService, EventManager, JhiLanguageService } from 'ng-jhipster';

import { UserProfile } from './user-profile.model';
import { UserProfilePopupService } from './user-profile-popup.service';
import { UserProfileService } from './user-profile.service';

@Component({
    selector: 'jhi-user-profile-dialog',
    templateUrl: './user-profile-dialog.component.html'
})
export class UserProfileDialogComponent implements OnInit {

    userProfile: UserProfile;
    authorities: any[];
    isSaving: boolean;

    constructor(public activeModal: NgbActiveModal,
        private jhiLanguageService: JhiLanguageService,
        private alertService: AlertService,
        private userProfileService: UserProfileService,
        private eventManager: EventManager) {
        this.jhiLanguageService.setLocations(['userProfile']);
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.userProfile.id !== undefined) {
            this.userProfileService.update(this.userProfile)
                .subscribe((res: UserProfile) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        } else {
            this.userProfileService.create(this.userProfile)
                .subscribe((res: UserProfile) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        }
    }

    private onSaveSuccess(result: UserProfile) {
        this.eventManager.broadcast({ name: 'userProfileListModification', content: 'OK' });
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError(error) {
        this.isSaving = false;
        this.onError(error);
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }
}

@Component({
    selector: 'jhi-user-profile-popup',
    template: ''
})
export class UserProfilePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(private route: ActivatedRoute,
        private userProfilePopupService: UserProfilePopupService) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if (params['id']) {
                this.modalRef = this.userProfilePopupService
                    .open(UserProfileDialogComponent, params['id']);
            } else {
                this.modalRef = this.userProfilePopupService
                    .open(UserProfileDialogComponent);
            }

        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
