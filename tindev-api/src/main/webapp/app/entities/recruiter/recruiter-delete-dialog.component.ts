import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, JhiLanguageService } from 'ng-jhipster';

import { Recruiter } from './recruiter.model';
import { RecruiterPopupService } from './recruiter-popup.service';
import { RecruiterService } from './recruiter.service';

@Component({
    selector: 'jhi-recruiter-delete-dialog',
    templateUrl: './recruiter-delete-dialog.component.html'
})
export class RecruiterDeleteDialogComponent {

    recruiter: Recruiter;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private recruiterService: RecruiterService,
        public activeModal: NgbActiveModal,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['recruiter']);
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.recruiterService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'recruiterListModification',
                content: 'Deleted an recruiter'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-recruiter-delete-popup',
    template: ''
})
export class RecruiterDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private recruiterPopupService: RecruiterPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.modalRef = this.recruiterPopupService
                .open(RecruiterDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
