import { Component, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Training } from './training.model';
import { TrainingService } from './training.service';
@Injectable()
export class TrainingPopupService {
    private isOpen = false;

    constructor(private modalService: NgbModal,
        private router: Router,
        private trainingService: TrainingService) {
    }

    open(component: Component, id?: number | any): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;

        if (id) {
            this.trainingService.find(id).subscribe((training) => {
                if (training.startDate) {
                    training.startDate = {
                        year: training.startDate.getFullYear(),
                        month: training.startDate.getMonth() + 1,
                        day: training.startDate.getDate()
                    };
                }
                if (training.endDate) {
                    training.endDate = {
                        year: training.endDate.getFullYear(),
                        month: training.endDate.getMonth() + 1,
                        day: training.endDate.getDate()
                    };
                }
                this.trainingModalRef(component, training);
            });
        } else {
            return this.trainingModalRef(component, new Training());
        }
    }

    trainingModalRef(component: Component, training: Training): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static' });
        modalRef.componentInstance.training = training;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true });
            this.isOpen = false;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true });
            this.isOpen = false;
        });
        return modalRef;
    }
}
