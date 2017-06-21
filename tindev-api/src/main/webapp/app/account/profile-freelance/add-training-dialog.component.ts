import {Component, Input} from "@angular/core";

import {ModalDismissReasons, NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {EventManager} from "ng-jhipster";
import {ToasterConfig, ToasterService} from "angular2-toaster/angular2-toaster";
import {Training} from "../../entities/training/training.model";
import {TrainingService} from "../../entities/training/training.service";
import {Freelance} from "../../entities/freelance/freelance.model";

@Component({
    selector: 'add-training-dialog',
    templateUrl: './add-training-dialog.component.html',
    styles: [`.edit-button {
        border-color: #cccccc;
        background-color: #ffffff;
    }`]
})
export class AddTrainingComponent {
    @Input() newTraining: Training;
    closeResult: string;
    modalRef: NgbModalRef;

    public configToaster : ToasterConfig = new ToasterConfig({
        positionClass: 'toast-top-right'
    });

    constructor(private modalService: NgbModal, private trainingService: TrainingService, private eventManager: EventManager, private toasterService: ToasterService) {
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

    createTraining() {
        this.trainingService.create(this.newTraining).subscribe(
            (res: Response) => {
                let freelance: Freelance = Object.assign(new Freelance(), this.newTraining.freelance);
                this.newTraining = new Training();
                this.newTraining.freelance = freelance;
                this.eventManager.broadcast({ name: 'TrainingListModification', content: 'OK' });
                this.modalRef.close();
                this.toasterService.pop('success', 'Training', 'sauvegardés avec succès');
            },
            (error) => {
                this.toasterService.pop('error', 'Training', error);
            });
    }
}
