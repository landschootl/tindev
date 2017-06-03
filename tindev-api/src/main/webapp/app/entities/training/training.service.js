"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var TrainingService = (function () {
    function TrainingService(http, dateUtils) {
        this.http = http;
        this.dateUtils = dateUtils;
        this.resourceUrl = 'api/trainings';
    }
    TrainingService.prototype.create = function (training) {
        var copy = Object.assign({}, training);
        copy.startDate = this.dateUtils
            .convertLocalDateToServer(training.startDate);
        copy.endDate = this.dateUtils
            .convertLocalDateToServer(training.endDate);
        return this.http.post(this.resourceUrl, copy).map(function (res) {
            return res.json();
        });
    };
    TrainingService.prototype.update = function (training) {
        var copy = Object.assign({}, training);
        copy.startDate = this.dateUtils
            .convertLocalDateToServer(training.startDate);
        copy.endDate = this.dateUtils
            .convertLocalDateToServer(training.endDate);
        return this.http.put(this.resourceUrl, copy).map(function (res) {
            return res.json();
        });
    };
    TrainingService.prototype.find = function (id) {
        var _this = this;
        return this.http.get(this.resourceUrl + "/" + id).map(function (res) {
            var jsonResponse = res.json();
            jsonResponse.startDate = _this.dateUtils
                .convertLocalDateFromServer(jsonResponse.startDate);
            jsonResponse.endDate = _this.dateUtils
                .convertLocalDateFromServer(jsonResponse.endDate);
            return jsonResponse;
        });
    };
    TrainingService.prototype.query = function (req) {
        var _this = this;
        var options = this.createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map(function (res) { return _this.convertResponse(res); });
    };
    TrainingService.prototype.delete = function (id) {
        return this.http.delete(this.resourceUrl + "/" + id);
    };
    TrainingService.prototype.convertResponse = function (res) {
        var jsonResponse = res.json();
        for (var i = 0; i < jsonResponse.length; i++) {
            jsonResponse[i].startDate = this.dateUtils
                .convertLocalDateFromServer(jsonResponse[i].startDate);
            jsonResponse[i].endDate = this.dateUtils
                .convertLocalDateFromServer(jsonResponse[i].endDate);
        }
        res._body = jsonResponse;
        return res;
    };
    TrainingService.prototype.createRequestOption = function (req) {
        var options = new http_1.BaseRequestOptions();
        if (req) {
            var params = new http_1.URLSearchParams();
            params.set('page', req.page);
            params.set('size', req.size);
            if (req.sort) {
                params.paramsMap.set('sort', req.sort);
            }
            params.set('query', req.query);
            options.search = params;
        }
        return options;
    };
    return TrainingService;
}());
TrainingService = __decorate([
    core_1.Injectable()
], TrainingService);
exports.TrainingService = TrainingService;
