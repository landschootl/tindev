import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { DateUtils, DataUtils, EventManager } from 'ng-jhipster';
import { TindevTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { FreelanceDetailComponent } from '../../../../../../main/webapp/app/entities/freelance/freelance-detail.component';
import { FreelanceService } from '../../../../../../main/webapp/app/entities/freelance/freelance.service';
import { Freelance } from '../../../../../../main/webapp/app/entities/freelance/freelance.model';

describe('Component Tests', () => {

    describe('Freelance Management Detail Component', () => {
        let comp: FreelanceDetailComponent;
        let fixture: ComponentFixture<FreelanceDetailComponent>;
        let service: FreelanceService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TindevTestModule],
                declarations: [FreelanceDetailComponent],
                providers: [
                    DateUtils,
                    DataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    FreelanceService,
                    EventManager
                ]
            }).overrideComponent(FreelanceDetailComponent, {
                set: {
                    template: ''
                }
            }).compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(FreelanceDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FreelanceService);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Freelance(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.freelance).toEqual(jasmine.objectContaining({id:10}));
            });
        });
    });

});
