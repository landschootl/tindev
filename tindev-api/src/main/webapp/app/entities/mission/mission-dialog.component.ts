import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AlertService, EventManager, JhiLanguageService } from 'ng-jhipster';

import { Mission } from './mission.model';
import { MissionPopupService } from './mission-popup.service';
import { MissionService } from './mission.service';
import { Discussion, DiscussionService } from '../discussion';
import { Recruiter, RecruiterService } from '../recruiter';
import { Matching, MatchingService } from '../matching';

@Component({
    selector: 'jhi-mission-dialog',
    templateUrl: './mission-dialog.component.html'
})
export class MissionDialogComponent implements OnInit {

    mission: Mission;
    authorities: any[];
    isSaving: boolean;

    discussions: Discussion[];

    recruiters: Recruiter[];

    matchings: Matching[];

    constructor(public activeModal: NgbActiveModal,
        private jhiLanguageService: JhiLanguageService,
        private alertService: AlertService,
        private missionService: MissionService,
        private discussionService: DiscussionService,
        private recruiterService: RecruiterService,
        private matchingService: MatchingService,
        private eventManager: EventManager) {
        this.jhiLanguageService.setLocations(['mission']);
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.discussionService.query().subscribe(
            (res: Response) => {
                this.discussions = res.json();
            }, (res: Response) => this.onError(res.json()));
        this.recruiterService.query().subscribe(
            (res: Response) => {
                this.recruiters = res.json();
            }, (res: Response) => this.onError(res.json()));
        this.matchingService.query().subscribe(
            (res: Response) => {
                this.matchings = res.json();
            }, (res: Response) => this.onError(res.json()));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.mission.id !== undefined) {
            this.missionService.update(this.mission)
                .subscribe((res: Mission) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        } else {
            this.missionService.create(this.mission)
                .subscribe((res: Mission) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        }
    }

    private onSaveSuccess(result: Mission) {
        this.eventManager.broadcast({ name: 'missionListModification', content: 'OK' });
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError(error) {
        this.isSaving = false;
        this.onError(error);
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }

    trackDiscussionById(index: number, item: Discussion) {
        return item.id;
    }

    trackRecruiterById(index: number, item: Recruiter) {
        return item.id;
    }

    trackMatchingById(index: number, item: Matching) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-mission-popup',
    template: ''
})
export class MissionPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(private route: ActivatedRoute,
        private missionPopupService: MissionPopupService) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if (params['id']) {
                this.modalRef = this.missionPopupService
                    .open(MissionDialogComponent, params['id']);
            } else {
                this.modalRef = this.missionPopupService
                    .open(MissionDialogComponent);
            }

        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
