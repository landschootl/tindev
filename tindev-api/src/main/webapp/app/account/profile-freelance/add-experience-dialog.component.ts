import {Component, Input} from "@angular/core";

import {ModalDismissReasons, NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {Mission} from "../../entities/mission/mission.model";
import {EventManager} from "ng-jhipster";
import {ToasterConfig, ToasterService} from "angular2-toaster/angular2-toaster";
import {Skill} from "../../entities/skill/skill.model";
import {SkillService} from "../../entities/skill/skill.service";
import {Experience} from "../../entities/experience/experience.model";
import {ExperienceService} from "../../entities/experience/experience.service";
import {Freelance} from "../../entities/freelance/freelance.model";

@Component({
    selector: 'add-experience-dialog',
    templateUrl: './add-experience-dialog.component.html',
    styles: [`.edit-button {
        border-color: #cccccc;
        background-color: #ffffff;
    }`]
})
export class AddExperienceComponent {
    @Input() newExperience: Experience;
    closeResult: string;
    modalRef: NgbModalRef;

    public configToaster : ToasterConfig = new ToasterConfig({
        positionClass: 'toast-top-right'
    });

    constructor(private modalService: NgbModal, private experienceService: ExperienceService, private eventManager: EventManager, private toasterService: ToasterService) {
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

    createExperience() {
        this.experienceService.create(this.newExperience).subscribe(
            (res: Response) => {
                let freelance: Freelance = Object.assign(new Freelance(), this.newExperience.freelance);
                this.newExperience = new Experience();
                this.newExperience.freelance = freelance;
                this.eventManager.broadcast({ name: 'ExperienceListModification', content: 'OK' });
                this.modalRef.close();
                this.toasterService.pop('success', 'Experience', 'sauvegardés avec succès');
            },
            (error) => {
                this.toasterService.pop('error', 'Experience', error);
            });
    }
}
