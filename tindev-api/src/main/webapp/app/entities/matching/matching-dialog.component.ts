import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService } from 'ng-jhipster';

import { Matching } from './matching.model';
import { MatchingPopupService } from './matching-popup.service';
import { MatchingService } from './matching.service';

@Component({
    selector: 'jhi-matching-dialog',
    templateUrl: './matching-dialog.component.html'
})
export class MatchingDialogComponent implements OnInit {

    matching: Matching;
    authorities: any[];
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: AlertService,
        private matchingService: MatchingService,
        private eventManager: EventManager
    ) {
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
        if (this.matching.id !== undefined) {
            this.subscribeToSaveResponse(
                this.matchingService.update(this.matching), false);
        } else {
            this.subscribeToSaveResponse(
                this.matchingService.create(this.matching), true);
        }
    }

    private subscribeToSaveResponse(result: Observable<Matching>, isCreated: boolean) {
        result.subscribe((res: Matching) =>
            this.onSaveSuccess(res, isCreated), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: Matching, isCreated: boolean) {
        this.alertService.success(
            isCreated ? 'tindevApp.matching.created'
            : 'tindevApp.matching.updated',
            { param : result.id }, null);

        this.eventManager.broadcast({ name: 'matchingListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError(error) {
        try {
            error.json();
        } catch (exception) {
            error.message = error.text();
        }
        this.isSaving = false;
        this.onError(error);
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }
}

@Component({
    selector: 'jhi-matching-popup',
    template: ''
})
export class MatchingPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private matchingPopupService: MatchingPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modalRef = this.matchingPopupService
                    .open(MatchingDialogComponent, params['id']);
            } else {
                this.modalRef = this.matchingPopupService
                    .open(MatchingDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
