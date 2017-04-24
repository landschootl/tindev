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
import { SpecialtyDetailComponent } from '../../../../../../main/webapp/app/entities/specialty/specialty-detail.component';
import { SpecialtyService } from '../../../../../../main/webapp/app/entities/specialty/specialty.service';
import { Specialty } from '../../../../../../main/webapp/app/entities/specialty/specialty.model';

describe('Component Tests', () => {

    describe('Specialty Management Detail Component', () => {
        let comp: SpecialtyDetailComponent;
        let fixture: ComponentFixture<SpecialtyDetailComponent>;
        let service: SpecialtyService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                declarations: [SpecialtyDetailComponent],
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
                    SpecialtyService
                ]
            }).overrideComponent(SpecialtyDetailComponent, {
                set: {
                    template: ''
                }
            }).compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SpecialtyDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SpecialtyService);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Specialty(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.specialty).toEqual(jasmine.objectContaining({id:10}));
            });
        });
    });

});
