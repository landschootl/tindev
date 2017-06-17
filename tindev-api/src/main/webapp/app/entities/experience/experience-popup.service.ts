import { Component, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Experience } from './experience.model';
import { ExperienceService } from './experience.service';
@Injectable()
export class ExperiencePopupService {
    private isOpen = false;

    constructor(private modalService: NgbModal,
        private router: Router,
        private experienceService: ExperienceService) {
    }

    open(component: Component, id?: number | any): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;

        if (id) {
            this.experienceService.find(id).subscribe((experience) => {
                if (experience.startYear) {
                    experience.startYear = {
                        year: experience.startYear.getFullYear(),
                        month: experience.startYear.getMonth() + 1,
                        day: experience.startYear.getDate()
                    };
                }
                if (experience.endYear) {
                    experience.endYear = {
                        year: experience.endYear.getFullYear(),
                        month: experience.endYear.getMonth() + 1,
                        day: experience.endYear.getDate()
                    };
                }
                this.experienceModalRef(component, experience);
            });
        } else {
            return this.experienceModalRef(component, new Experience());
        }
    }

    experienceModalRef(component: Component, experience: Experience): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static' });
        modalRef.componentInstance.experience = experience;
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
