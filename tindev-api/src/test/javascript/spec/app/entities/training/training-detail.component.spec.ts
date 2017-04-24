import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';
import { Http, BaseRequestOptions } from '@angular/http';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { DateUtils, DataUtils } from 'ng-jhipster';
import { JhiLanguageService } from 'ng-jhipster';
import { MockLanguageService } from '../../../helpers/mock-language.service';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { TrainingDetailComponent } from '../../../../../../main/webapp/app/entities/training/training-detail.component';
import { TrainingService } from '../../../../../../main/webapp/app/entities/training/training.service';
import { Training } from '../../../../../../main/webapp/app/entities/training/training.model';

describe('Component Tests', () => {

    describe('Training Management Detail Component', () => {
        let comp: TrainingDetailComponent;
        let fixture: ComponentFixture<TrainingDetailComponent>;
        let service: TrainingService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                declarations: [TrainingDetailComponent],
                providers: [
                    MockBackend,
                    BaseRequestOptions,
                    DateUtils,
                    DataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    {
                        provide: Http,
                        useFactory: (backendInstance: MockBackend, defaultOptions: BaseRequestOptions) => {
                            return new Http(backendInstance, defaultOptions);
                        },
                        deps: [MockBackend, BaseRequestOptions]
                    },
                    {
                        provide: JhiLanguageService,
                        useClass: MockLanguageService
                    },
                    TrainingService
                ]
            }).overrideComponent(TrainingDetailComponent, {
                set: {
                    template: ''
                }
            }).compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TrainingDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TrainingService);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Training(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.training).toEqual(jasmine.objectContaining({id:10}));
            });
        });
    });

});
