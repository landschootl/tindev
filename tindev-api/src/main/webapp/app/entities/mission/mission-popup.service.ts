import { Component, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Mission } from './mission.model';
import { MissionService } from './mission.service';
@Injectable()
export class MissionPopupService {
    private isOpen = false;
    constructor (
        private modalService: NgbModal,
        private router: Router,
        private missionService: MissionService

    ) {}

    open (component: Component, id?: number | any): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;

        if (id) {
            this.missionService.find(id).subscribe(mission => {
                if (mission.startDate) {
                    mission.startDate = {
                        year: mission.startDate.getFullYear(),
                        month: mission.startDate.getMonth() + 1,
                        day: mission.startDate.getDate()
                    };
                }
                if (mission.endDate) {
                    mission.endDate = {
                        year: mission.endDate.getFullYear(),
                        month: mission.endDate.getMonth() + 1,
                        day: mission.endDate.getDate()
                    };
                }
                this.missionModalRef(component, mission);
            });
        } else {
            return this.missionModalRef(component, new Mission());
        }
    }

    missionModalRef(component: Component, mission: Mission): NgbModalRef {
        let modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.mission = mission;
        modalRef.result.then(result => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.isOpen = false;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.isOpen = false;
        });
        return modalRef;
    }
}
