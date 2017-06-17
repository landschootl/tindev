import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, JhiLanguageService } from 'ng-jhipster';

import { UserProfile } from './user-profile.model';
import { UserProfilePopupService } from './user-profile-popup.service';
import { UserProfileService } from './user-profile.service';

@Component({
    selector: 'jhi-user-profile-delete-dialog',
    templateUrl: './user-profile-delete-dialog.component.html'
})
export class UserProfileDeleteDialogComponent {

    userProfile: UserProfile;

    constructor(private jhiLanguageService: JhiLanguageService,
        private userProfileService: UserProfileService,
        public activeModal: NgbActiveModal,
        private eventManager: EventManager) {
        this.jhiLanguageService.setLocations(['userProfile']);
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.userProfileService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'userProfileListModification',
                content: 'Deleted an userProfile'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-user-profile-delete-popup',
    template: ''
})
export class UserProfileDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(private route: ActivatedRoute,
        private userProfilePopupService: UserProfilePopupService) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.modalRef = this.userProfilePopupService
                .open(UserProfileDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
