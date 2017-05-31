import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AlertService, EventManager } from 'ng-jhipster';

import { Freelance } from './freelance.model';
import { FreelancePopupService } from './freelance-popup.service';
import { FreelanceService } from './freelance.service';

@Component({
    selector: 'jhi-freelance-delete-dialog',
    templateUrl: './freelance-delete-dialog.component.html'
})
export class FreelanceDeleteDialogComponent {

    freelance: Freelance;

    constructor(
        private freelanceService: FreelanceService,
        public activeModal: NgbActiveModal,
        private alertService: AlertService,
        private eventManager: EventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.freelanceService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'freelanceListModification',
                content: 'Deleted an freelance'
            });
            this.activeModal.dismiss(true);
        });
        this.alertService.success('tindevApp.freelance.deleted', { param : id }, null);
    }
}

@Component({
    selector: 'jhi-freelance-delete-popup',
    template: ''
})
export class FreelanceDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private freelancePopupService: FreelancePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.modalRef = this.freelancePopupService
                .open(FreelanceDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
