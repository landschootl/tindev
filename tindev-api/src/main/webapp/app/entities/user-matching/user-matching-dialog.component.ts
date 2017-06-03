import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService } from 'ng-jhipster';

import { UserMatching } from './user-matching.model';
import { UserMatchingPopupService } from './user-matching-popup.service';
import { UserMatchingService } from './user-matching.service';
import { Freelance, FreelanceService } from '../freelance';
import { Recruiter, RecruiterService } from '../recruiter';
@Component({
    selector: 'jhi-user-matching-dialog',
    templateUrl: './user-matching-dialog.component.html'
})
export class UserMatchingDialogComponent implements OnInit {

    userMatching: UserMatching;
    authorities: any[];
    isSaving: boolean;

    freelances: Freelance[];

    recruiters: Recruiter[];

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: AlertService,
        private userMatchingService: UserMatchingService,
        private freelanceService: FreelanceService,
        private recruiterService: RecruiterService,
        private eventManager: EventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.freelanceService.query()
            .subscribe((res: Response) => { this.freelances = res.json(); }, (res: Response) => this.onError(res.json()));
        this.recruiterService.query()
            .subscribe((res: Response) => { this.recruiters = res.json(); }, (res: Response) => this.onError(res.json()));
    }
    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.userMatching.id !== undefined) {
            this.subscribeToSaveResponse(
                this.userMatchingService.update(this.userMatching), false);
        } else {
            this.subscribeToSaveResponse(
                this.userMatchingService.create(this.userMatching), true);
        }
    }

    private subscribeToSaveResponse(result: Observable<UserMatching>, isCreated: boolean) {
        result.subscribe((res: UserMatching) =>
            this.onSaveSuccess(res, isCreated), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: UserMatching, isCreated: boolean) {
        this.alertService.success(
            isCreated ? 'tindevApp.userMatching.created'
            : 'tindevApp.userMatching.updated',
            { param : result.id }, null);

        this.eventManager.broadcast({ name: 'userMatchingListModification', content: 'OK'});
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

    trackFreelanceById(index: number, item: Freelance) {
        return item.id;
    }

    trackRecruiterById(index: number, item: Recruiter) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-user-matching-popup',
    template: ''
})
export class UserMatchingPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private userMatchingPopupService: UserMatchingPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modalRef = this.userMatchingPopupService
                    .open(UserMatchingDialogComponent, params['id']);
            } else {
                this.modalRef = this.userMatchingPopupService
                    .open(UserMatchingDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
