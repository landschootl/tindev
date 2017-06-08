import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AlertService, EventManager } from 'ng-jhipster';

import { Matching } from './matching.model';
import { MatchingPopupService } from './matching-popup.service';
import { MatchingService } from './matching.service';

@Component({
    selector: 'jhi-matching-delete-dialog',
    templateUrl: './matching-delete-dialog.component.html'
})
export class MatchingDeleteDialogComponent {

    matching: Matching;

    constructor(
        private matchingService: MatchingService,
        public activeModal: NgbActiveModal,
        private alertService: AlertService,
        private eventManager: EventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.matchingService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'matchingListModification',
                content: 'Deleted an matching'
            });
            this.activeModal.dismiss(true);
        });
        this.alertService.success('tindevApp.matching.deleted', { param : id }, null);
    }
}

@Component({
    selector: 'jhi-matching-delete-popup',
    template: ''
})
export class MatchingDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private matchingPopupService: MatchingPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.modalRef = this.matchingPopupService
                .open(MatchingDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
