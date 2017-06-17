import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AlertService, EventManager, JhiLanguageService } from 'ng-jhipster';

import { Recruiter } from './recruiter.model';
import { RecruiterPopupService } from './recruiter-popup.service';
import { RecruiterService } from './recruiter.service';

@Component({
    selector: 'jhi-recruiter-dialog',
    templateUrl: './recruiter-dialog.component.html'
})
export class RecruiterDialogComponent implements OnInit {

    recruiter: Recruiter;
    authorities: any[];
    isSaving: boolean;

    constructor(public activeModal: NgbActiveModal,
        private jhiLanguageService: JhiLanguageService,
        private alertService: AlertService,
        private recruiterService: RecruiterService,
        private eventManager: EventManager) {
        this.jhiLanguageService.setLocations(['recruiter']);
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
        if (this.recruiter.id !== undefined) {
            this.recruiterService.update(this.recruiter)
                .subscribe((res: Recruiter) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
        } else {
            this.recruiterService.create(this.recruiter)
                .subscribe((res: Recruiter) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
        }
    }

    private onSaveSuccess(result: Recruiter) {
        this.eventManager.broadcast({ name: 'recruiterListModification', content: 'OK' });
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
    selector: 'jhi-recruiter-popup',
    template: ''
})
export class RecruiterPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(private route: ActivatedRoute,
        private recruiterPopupService: RecruiterPopupService) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if (params['id']) {
                this.modalRef = this.recruiterPopupService
                    .open(RecruiterDialogComponent, params['id']);
            } else {
                this.modalRef = this.recruiterPopupService
                    .open(RecruiterDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
