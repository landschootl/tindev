import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService } from 'ng-jhipster';

import { Domain } from './domain.model';
import { DomainPopupService } from './domain-popup.service';
import { DomainService } from './domain.service';

@Component({
    selector: 'jhi-domain-dialog',
    templateUrl: './domain-dialog.component.html'
})
export class DomainDialogComponent implements OnInit {

    domain: Domain;
    authorities: any[];
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: AlertService,
        private domainService: DomainService,
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
        if (this.domain.id !== undefined) {
            this.subscribeToSaveResponse(
                this.domainService.update(this.domain), false);
        } else {
            this.subscribeToSaveResponse(
                this.domainService.create(this.domain), true);
        }
    }

    private subscribeToSaveResponse(result: Observable<Domain>, isCreated: boolean) {
        result.subscribe((res: Domain) =>
            this.onSaveSuccess(res, isCreated), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: Domain, isCreated: boolean) {
        this.alertService.success(
            isCreated ? 'tindevApp.domain.created'
            : 'tindevApp.domain.updated',
            { param : result.id }, null);

        this.eventManager.broadcast({ name: 'domainListModification', content: 'OK'});
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
    selector: 'jhi-domain-popup',
    template: ''
})
export class DomainPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private domainPopupService: DomainPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modalRef = this.domainPopupService
                    .open(DomainDialogComponent, params['id']);
            } else {
                this.modalRef = this.domainPopupService
                    .open(DomainDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
