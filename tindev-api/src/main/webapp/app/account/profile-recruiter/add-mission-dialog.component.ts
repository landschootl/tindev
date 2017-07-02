import { Component, Input } from '@angular/core';

import { ModalDismissReasons, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Mission } from '../../entities/mission/mission.model';
import { MissionService } from '../../entities/mission/mission.service';
import { EventManager } from 'ng-jhipster';
import {ToasterService, ToasterConfig} from "angular2-toaster/angular2-toaster";
import {Recruiter} from "../../entities/recruiter/recruiter.model";
import {UserProfile} from "../../entities/user-profile/user-profile.model";
import {DomainService} from "../../entities/domain/domain.service";
import {SpecialtyService} from "../../entities/specialty/specialty.service";
import {Specialty} from "../../entities/specialty/specialty.model";
import {Response} from "@angular/http";
import {Domain} from "../../entities/domain/domain.model";

@Component({
    selector: 'add-mission-dialog',
    templateUrl: './add-mission-dialog.component.html',
    styles: [`.edit-button {
        border-color: #cccccc;
        background-color: #ffffff;
    }`]
})
export class AddMissionComponent {
    @Input() newMission: Mission;
    closeResult: string;
    modalRef: NgbModalRef;

    public configToaster : ToasterConfig = new ToasterConfig({
        positionClass: 'toast-top-right'
    });
    private specialties: Specialty[];
    private domains: Domain[];

    constructor(private modalService: NgbModal, private missionService: MissionService, private eventManager: EventManager, private toasterService: ToasterService, private domainService: DomainService, private specialtyService: SpecialtyService) {
    }

    ngOnInit(): void {
        this.specialtyService.query()
            .subscribe(
                (res) => this.specialties = res.json
            );
        this.domainService.query()
            .subscribe(
                (res) => this.domains = res.json
            );

    }

    open(content) {
        this.modalRef = this.modalService.open(content, { size: 'lg' });
        this.modalRef.result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }

    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return `with: ${reason}`;
        }
    }

    createMission() {
        this.missionService.create(this.newMission).subscribe(
            (res: Response) => {
                let recruiter: Recruiter = Object.assign(new Recruiter(), this.newMission.recruiter);
                this.newMission = new Mission();
                this.newMission.recruiter = recruiter;
                this.eventManager.broadcast({ name: 'missionListModification', content: 'OK' });
                this.modalRef.close();
                this.toasterService.pop('success', 'Mission', 'sauvegardés avec succès');
            },
            (error) => {
                this.toasterService.pop('error', 'Mission', error);
            });
    }
}
