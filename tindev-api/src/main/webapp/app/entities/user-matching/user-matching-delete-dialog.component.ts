import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AlertService, EventManager } from 'ng-jhipster';

import { UserMatching } from './user-matching.model';
import { UserMatchingPopupService } from './user-matching-popup.service';
import { UserMatchingService } from './user-matching.service';

@Component({
    selector: 'jhi-user-matching-delete-dialog',
    templateUrl: './user-matching-delete-dialog.component.html'
})
export class UserMatchingDeleteDialogComponent {

    userMatching: UserMatching;

    constructor(
        private userMatchingService: UserMatchingService,
        public activeModal: NgbActiveModal,
        private alertService: AlertService,
        private eventManager: EventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.userMatchingService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'userMatchingListModification',
                content: 'Deleted an userMatching'
            });
            this.activeModal.dismiss(true);
        });
        this.alertService.success('tindevApp.userMatching.deleted', { param : id }, null);
    }
}

@Component({
    selector: 'jhi-user-matching-delete-popup',
    template: ''
})
export class UserMatchingDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private userMatchingPopupService: UserMatchingPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.modalRef = this.userMatchingPopupService
                .open(UserMatchingDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
