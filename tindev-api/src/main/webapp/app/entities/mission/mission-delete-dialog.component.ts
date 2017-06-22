import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AlertService, EventManager } from 'ng-jhipster';

import { Mission } from './mission.model';
import { MissionPopupService } from './mission-popup.service';
import { MissionService } from './mission.service';

@Component({
    selector: 'jhi-mission-delete-dialog',
    templateUrl: './mission-delete-dialog.component.html'
})
export class MissionDeleteDialogComponent {

    mission: Mission;

    constructor(
        private missionService: MissionService,
        public activeModal: NgbActiveModal,
        private alertService: AlertService,
        private eventManager: EventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.missionService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'missionListModification',
                content: 'Deleted an mission'
            });
            this.activeModal.dismiss(true);
        });
        this.alertService.success('tindevApp.mission.deleted', { param : id }, null);
    }
}

@Component({
    selector: 'jhi-mission-delete-popup',
    template: ''
})
export class MissionDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private missionPopupService: MissionPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.modalRef = this.missionPopupService
                .open(MissionDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
