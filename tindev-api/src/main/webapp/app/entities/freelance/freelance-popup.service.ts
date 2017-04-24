import { Component, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Freelance } from './freelance.model';
import { FreelanceService } from './freelance.service';
@Injectable()
export class FreelancePopupService {
    private isOpen = false;
    constructor (
        private modalService: NgbModal,
        private router: Router,
        private freelanceService: FreelanceService

    ) {}

    open (component: Component, id?: number | any): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;

        if (id) {
            this.freelanceService.find(id).subscribe(freelance => {
                if (freelance.birthdate) {
                    freelance.birthdate = {
                        year: freelance.birthdate.getFullYear(),
                        month: freelance.birthdate.getMonth() + 1,
                        day: freelance.birthdate.getDate()
                    };
                }
                this.freelanceModalRef(component, freelance);
            });
        } else {
            return this.freelanceModalRef(component, new Freelance());
        }
    }

    freelanceModalRef(component: Component, freelance: Freelance): NgbModalRef {
        let modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.freelance = freelance;
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
