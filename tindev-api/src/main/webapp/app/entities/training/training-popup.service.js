"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var training_model_1 = require("./training.model");
var TrainingPopupService = (function () {
    function TrainingPopupService(modalService, router, trainingService) {
        this.modalService = modalService;
        this.router = router;
        this.trainingService = trainingService;
        this.isOpen = false;
    }
    TrainingPopupService.prototype.open = function (component, id) {
        var _this = this;
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;
        if (id) {
            this.trainingService.find(id).subscribe(function (training) {
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
                _this.trainingModalRef(component, training);
            });
        }
        else {
            return this.trainingModalRef(component, new training_model_1.Training());
        }
    };
    TrainingPopupService.prototype.trainingModalRef = function (component, training) {
        var _this = this;
        var modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static' });
        modalRef.componentInstance.training = training;
        modalRef.result.then(function (result) {
            _this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true });
            _this.isOpen = false;
        }, function (reason) {
            _this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true });
            _this.isOpen = false;
        });
        return modalRef;
    };
    return TrainingPopupService;
}());
TrainingPopupService = __decorate([
    core_1.Injectable()
], TrainingPopupService);
exports.TrainingPopupService = TrainingPopupService;
