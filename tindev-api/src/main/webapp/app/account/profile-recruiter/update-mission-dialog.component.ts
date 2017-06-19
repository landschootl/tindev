import { Component, Input } from '@angular/core';

import { ModalDismissReasons, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Mission } from '../../entities/mission/mission.model';
import { MissionService } from '../../entities/mission/mission.service';
import { EventManager } from 'ng-jhipster';
import {ToasterService, ToasterConfig} from "angular2-toaster/angular2-toaster";

@Component({
    selector: 'update-mission-dialog',
    templateUrl: './update-mission-dialog.component.html',
    styles: []
})
export class UpdateMissionComponent {
    @Input() mission: Mission;
    closeResult: string;
    modalRef: NgbModalRef;

    public configToaster : ToasterConfig = new ToasterConfig({
        positionClass: 'toast-top-right'
    });

    constructor(private modalService: NgbModal, private missionService: MissionService, private eventManager: EventManager, private toasterService: ToasterService) {
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

    updateMission() {
        this.missionService.update(this.mission).subscribe(
            (res: Response) => {
                this.mission = new Mission();
                this.eventManager.broadcast({ name: 'missionListModification', content: 'OK' });
                this.modalRef.close();
                this.toasterService.pop('success', 'Mission', 'sauvegardés avec succès');
            }, (error) => {
                this.toasterService.pop('error', 'Mission', error);
            });
    }
}
