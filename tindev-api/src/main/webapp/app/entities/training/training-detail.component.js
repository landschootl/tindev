"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var TrainingDetailComponent = (function () {
    function TrainingDetailComponent(eventManager, jhiLanguageService, trainingService, route) {
        this.eventManager = eventManager;
        this.jhiLanguageService = jhiLanguageService;
        this.trainingService = trainingService;
        this.route = route;
        this.jhiLanguageService.setLocations(['training']);
    }
    TrainingDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.subscription = this.route.params.subscribe(function (params) {
            _this.load(params['id']);
        });
        this.registerChangeInTrainings();
    };
    TrainingDetailComponent.prototype.load = function (id) {
        var _this = this;
        this.trainingService.find(id).subscribe(function (training) {
            _this.training = training;
        });
    };
    TrainingDetailComponent.prototype.previousState = function () {
        window.history.back();
    };
    TrainingDetailComponent.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    };
    TrainingDetailComponent.prototype.registerChangeInTrainings = function () {
        var _this = this;
        this.eventSubscriber = this.eventManager.subscribe('trainingListModification', function (response) { return _this.load(_this.training.id); });
    };
    return TrainingDetailComponent;
}());
TrainingDetailComponent = __decorate([
    core_1.Component({
        selector: 'jhi-training-detail',
        templateUrl: './training-detail.component.html'
    })
], TrainingDetailComponent);
exports.TrainingDetailComponent = TrainingDetailComponent;
