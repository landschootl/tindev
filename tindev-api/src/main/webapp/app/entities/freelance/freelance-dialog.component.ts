import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService } from 'ng-jhipster';

import { Freelance } from './freelance.model';
import { FreelancePopupService } from './freelance-popup.service';
import { FreelanceService } from './freelance.service';
import { Specialty, SpecialtyService } from '../specialty';
import { Domain, DomainService } from '../domain';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-freelance-dialog',
    templateUrl: './freelance-dialog.component.html'
})
export class FreelanceDialogComponent implements OnInit {

    freelance: Freelance;
    authorities: any[];
    isSaving: boolean;

    specialties: Specialty[];

    domains: Domain[];
    birthdateDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: AlertService,
        private freelanceService: FreelanceService,
        private specialtyService: SpecialtyService,
        private domainService: DomainService,
        private eventManager: EventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.specialtyService.query()
            .subscribe((res: ResponseWrapper) => { this.specialties = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.domainService.query()
            .subscribe((res: ResponseWrapper) => { this.domains = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }
    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.freelance.id !== undefined) {
            this.subscribeToSaveResponse(
                this.freelanceService.update(this.freelance), false);
        } else {
            this.subscribeToSaveResponse(
                this.freelanceService.create(this.freelance), true);
        }
    }

    private subscribeToSaveResponse(result: Observable<Freelance>, isCreated: boolean) {
        result.subscribe((res: Freelance) =>
            this.onSaveSuccess(res, isCreated), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: Freelance, isCreated: boolean) {
        this.alertService.success(
            isCreated ? 'tindevApp.freelance.created'
            : 'tindevApp.freelance.updated',
            { param : result.id }, null);

        this.eventManager.broadcast({ name: 'freelanceListModification', content: 'OK'});
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

    trackSpecialtyById(index: number, item: Specialty) {
        return item.id;
    }

    trackDomainById(index: number, item: Domain) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-freelance-popup',
    template: ''
})
export class FreelancePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private freelancePopupService: FreelancePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modalRef = this.freelancePopupService
                    .open(FreelanceDialogComponent, params['id']);
            } else {
                this.modalRef = this.freelancePopupService
                    .open(FreelanceDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
