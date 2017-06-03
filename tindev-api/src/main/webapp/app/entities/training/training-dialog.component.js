"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var TrainingDialogComponent = (function () {
    function TrainingDialogComponent(activeModal, jhiLanguageService, alertService, trainingService, freelanceService, eventManager) {
        this.activeModal = activeModal;
        this.jhiLanguageService = jhiLanguageService;
        this.alertService = alertService;
        this.trainingService = trainingService;
        this.freelanceService = freelanceService;
        this.eventManager = eventManager;
        this.jhiLanguageService.setLocations(['training']);
    }
    TrainingDialogComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.freelanceService.query().subscribe(function (res) { _this.freelances = res.json(); }, function (res) { return _this.onError(res.json()); });
    };
    TrainingDialogComponent.prototype.clear = function () {
        this.activeModal.dismiss('cancel');
    };
    TrainingDialogComponent.prototype.save = function () {
        var _this = this;
        this.isSaving = true;
        if (this.training.id !== undefined) {
            this.trainingService.update(this.training)
                .subscribe(function (res) {
                return _this.onSaveSuccess(res);
            }, function (res) { return _this.onSaveError(res); });
        }
        else {
            this.trainingService.create(this.training)
                .subscribe(function (res) {
                return _this.onSaveSuccess(res);
            }, function (res) { return _this.onSaveError(res); });
        }
    };
    TrainingDialogComponent.prototype.onSaveSuccess = function (result) {
        this.eventManager.broadcast({ name: 'trainingListModification', content: 'OK' });
        this.isSaving = false;
        this.activeModal.dismiss(result);
    };
    TrainingDialogComponent.prototype.onSaveError = function (error) {
        try {
            error.json();
        }
        catch (exception) {
            error.message = error.text();
        }
        this.isSaving = false;
        this.onError(error);
    };
    TrainingDialogComponent.prototype.onError = function (error) {
        this.alertService.error(error.message, null, null);
    };
    TrainingDialogComponent.prototype.trackFreelanceById = function (index, item) {
        return item.id;
    };
    return TrainingDialogComponent;
}());
TrainingDialogComponent = __decorate([
    core_1.Component({
        selector: 'jhi-training-dialog',
        templateUrl: './training-dialog.component.html'
    })
], TrainingDialogComponent);
exports.TrainingDialogComponent = TrainingDialogComponent;
var TrainingPopupComponent = (function () {
    function TrainingPopupComponent(route, trainingPopupService) {
        this.route = route;
        this.trainingPopupService = trainingPopupService;
    }
    TrainingPopupComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.routeSub = this.route.params.subscribe(function (params) {
            if (params['id']) {
                _this.modalRef = _this.trainingPopupService
                    .open(TrainingDialogComponent, params['id']);
            }
            else {
                _this.modalRef = _this.trainingPopupService
                    .open(TrainingDialogComponent);
            }
        });
    };
    TrainingPopupComponent.prototype.ngOnDestroy = function () {
        this.routeSub.unsubscribe();
    };
    return TrainingPopupComponent;
}());
TrainingPopupComponent = __decorate([
    core_1.Component({
        selector: 'jhi-training-popup',
        template: ''
    })
], TrainingPopupComponent);
exports.TrainingPopupComponent = TrainingPopupComponent;
