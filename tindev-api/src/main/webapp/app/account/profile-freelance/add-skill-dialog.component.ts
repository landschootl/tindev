import {Component, Input} from "@angular/core";

import {ModalDismissReasons, NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {Mission} from "../../entities/mission/mission.model";
import {EventManager} from "ng-jhipster";
import {ToasterConfig, ToasterService} from "angular2-toaster/angular2-toaster";
import {Skill} from "../../entities/skill/skill.model";
import {SkillService} from "../../entities/skill/skill.service";

@Component({
    selector: 'add-skill-dialog',
    templateUrl: './add-skill-dialog.component.html',
    styles: [`.edit-button {
        border-color: #cccccc;
        background-color: #ffffff;
    }`]
})
export class AddSkillComponent {
    @Input() newSkill: Skill;
    closeResult: string;
    modalRef: NgbModalRef;

    public configToaster : ToasterConfig = new ToasterConfig({
        positionClass: 'toast-top-right'
    });

    constructor(private modalService: NgbModal, private skillService: SkillService, private eventManager: EventManager, private toasterService: ToasterService) {
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

    createSkill() {
        this.skillService.create(this.newSkill).subscribe(
            (res: Response) => {
                this.newSkill.name = "";
                this.eventManager.broadcast({ name: 'skillListModification', content: 'OK' });
                this.modalRef.close();
                this.toasterService.pop('success', 'Compétence', 'sauvegardés avec succès');
            },
            (error) => {
                this.toasterService.pop('error', 'Compétence', error);
            });
    }
}
