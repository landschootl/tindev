import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService } from 'ng-jhipster';

import { Discussion } from './discussion.model';
import { DiscussionPopupService } from './discussion-popup.service';
import { DiscussionService } from './discussion.service';
import { Freelance, FreelanceService } from '../freelance';
import { Mission, MissionService } from '../mission';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-discussion-dialog',
    templateUrl: './discussion-dialog.component.html'
})
export class DiscussionDialogComponent implements OnInit {

    discussion: Discussion;
    authorities: any[];
    isSaving: boolean;

    freelances: Freelance[];

    missions: Mission[];

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: AlertService,
        private discussionService: DiscussionService,
        private freelanceService: FreelanceService,
        private missionService: MissionService,
        private eventManager: EventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.freelanceService.query()
            .subscribe((res: ResponseWrapper) => { this.freelances = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.missionService.query()
            .subscribe((res: ResponseWrapper) => { this.missions = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }
    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.discussion.id !== undefined) {
            this.subscribeToSaveResponse(
                this.discussionService.update(this.discussion), false);
        } else {
            this.subscribeToSaveResponse(
                this.discussionService.create(this.discussion), true);
        }
    }

    private subscribeToSaveResponse(result: Observable<Discussion>, isCreated: boolean) {
        result.subscribe((res: Discussion) =>
            this.onSaveSuccess(res, isCreated), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: Discussion, isCreated: boolean) {
        this.alertService.success(
            isCreated ? 'tindevApp.discussion.created'
            : 'tindevApp.discussion.updated',
            { param : result.id }, null);

        this.eventManager.broadcast({ name: 'discussionListModification', content: 'OK'});
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

    trackMissionById(index: number, item: Mission) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-discussion-popup',
    template: ''
})
export class DiscussionPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private discussionPopupService: DiscussionPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modalRef = this.discussionPopupService
                    .open(DiscussionDialogComponent, params['id']);
            } else {
                this.modalRef = this.discussionPopupService
                    .open(DiscussionDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
