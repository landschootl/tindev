import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AlertService, EventManager, JhiLanguageService } from 'ng-jhipster';

import { Freelance } from './freelance.model';
import { FreelancePopupService } from './freelance-popup.service';
import { FreelanceService } from './freelance.service';
import { Specialty, SpecialtyService } from '../specialty';
import { Domain, DomainService } from '../domain';
import { Training, TrainingService } from '../training';
import { Skill, SkillService } from '../skill';
import { Experience, ExperienceService } from '../experience';
import { Discussion, DiscussionService } from '../discussion';
import { Matching, MatchingService } from '../matching';

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

    trainings: Training[];

    skills: Skill[];

    experiences: Experience[];

    discussions: Discussion[];

    matchings: Matching[];

    constructor(public activeModal: NgbActiveModal,
        private jhiLanguageService: JhiLanguageService,
        private alertService: AlertService,
        private freelanceService: FreelanceService,
        private specialtyService: SpecialtyService,
        private domainService: DomainService,
        private trainingService: TrainingService,
        private skillService: SkillService,
        private experienceService: ExperienceService,
        private discussionService: DiscussionService,
        private matchingService: MatchingService,
        private eventManager: EventManager) {
        this.jhiLanguageService.setLocations(['freelance']);
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.specialtyService.query().subscribe(
            (res: Response) => {
                this.specialties = res.json();
            }, (res: Response) => this.onError(res.json()));
        this.domainService.query().subscribe(
            (res: Response) => {
                this.domains = res.json();
            }, (res: Response) => this.onError(res.json()));
        this.trainingService.query().subscribe(
            (res: Response) => {
                this.trainings = res.json();
            }, (res: Response) => this.onError(res.json()));
        this.skillService.query().subscribe(
            (res: Response) => {
                this.skills = res.json();
            }, (res: Response) => this.onError(res.json()));
        this.experienceService.query().subscribe(
            (res: Response) => {
                this.experiences = res.json();
            }, (res: Response) => this.onError(res.json()));
        this.discussionService.query().subscribe(
            (res: Response) => {
                this.discussions = res.json();
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
        if (this.freelance.id !== undefined) {
            this.freelanceService.update(this.freelance)
                .subscribe((res: Freelance) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        } else {
            this.freelanceService.create(this.freelance)
                .subscribe((res: Freelance) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        }
    }

    private onSaveSuccess(result: Freelance) {
        this.eventManager.broadcast({ name: 'freelanceListModification', content: 'OK' });
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

    trackSpecialtyById(index: number, item: Specialty) {
        return item.id;
    }

    trackDomainById(index: number, item: Domain) {
        return item.id;
    }

    trackTrainingById(index: number, item: Training) {
        return item.id;
    }

    trackSkillById(index: number, item: Skill) {
        return item.id;
    }

    trackExperienceById(index: number, item: Experience) {
        return item.id;
    }

    trackDiscussionById(index: number, item: Discussion) {
        return item.id;
    }

    trackMatchingById(index: number, item: Matching) {
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

    constructor(private route: ActivatedRoute,
        private freelancePopupService: FreelancePopupService) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if (params['id']) {
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
