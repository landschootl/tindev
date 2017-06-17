import { Component, Input } from '@angular/core';

import { ModalDismissReasons, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Mission } from '../../entities/mission/mission.model';
import { MissionService } from '../../entities/mission/mission.service';
import { EventManager } from 'ng-jhipster';

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

    constructor(private modalService: NgbModal, private missionService: MissionService, private eventManager: EventManager) {}

    open(content) {
        this.modalRef = this.modalService.open(content, {size: 'lg'});
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
            return  `with: ${reason}`;
        }
    }

    createMission() {
        this.missionService.create(this.newMission).subscribe(
            (res: Response) => {
                this.newMission = new Mission();
                this.eventManager.broadcast({ name: 'missionListModification', content: 'OK'});
                this.modalRef.close();
            });
    }
}
