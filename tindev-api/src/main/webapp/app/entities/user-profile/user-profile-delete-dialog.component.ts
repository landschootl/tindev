import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AlertService, EventManager } from 'ng-jhipster';

import { UserProfile } from './user-profile.model';
import { UserProfilePopupService } from './user-profile-popup.service';
import { UserProfileService } from './user-profile.service';

@Component({
    selector: 'jhi-user-profile-delete-dialog',
    templateUrl: './user-profile-delete-dialog.component.html'
})
export class UserProfileDeleteDialogComponent {

    userProfile: UserProfile;

    constructor(
        private userProfileService: UserProfileService,
        public activeModal: NgbActiveModal,
        private alertService: AlertService,
        private eventManager: EventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.userProfileService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'userProfileListModification',
                content: 'Deleted an userProfile'
            });
            this.activeModal.dismiss(true);
        });
        this.alertService.success('tindevApp.userProfile.deleted', { param : id }, null);
    }
}

@Component({
    selector: 'jhi-user-profile-delete-popup',
    template: ''
})
export class UserProfileDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private userProfilePopupService: UserProfilePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.modalRef = this.userProfilePopupService
                .open(UserProfileDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
