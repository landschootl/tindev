import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { DateUtils, DataUtils, EventManager } from 'ng-jhipster';
import { TindevTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { RecruiterDetailComponent } from '../../../../../../main/webapp/app/entities/recruiter/recruiter-detail.component';
import { RecruiterService } from '../../../../../../main/webapp/app/entities/recruiter/recruiter.service';
import { Recruiter } from '../../../../../../main/webapp/app/entities/recruiter/recruiter.model';

describe('Component Tests', () => {

    describe('Recruiter Management Detail Component', () => {
        let comp: RecruiterDetailComponent;
        let fixture: ComponentFixture<RecruiterDetailComponent>;
        let service: RecruiterService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TindevTestModule],
                declarations: [RecruiterDetailComponent],
                providers: [
                    DateUtils,
                    DataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    RecruiterService,
                    EventManager
                ]
            }).overrideComponent(RecruiterDetailComponent, {
                set: {
                    template: ''
                }
            }).compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RecruiterDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RecruiterService);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Recruiter(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.recruiter).toEqual(jasmine.objectContaining({id:10}));
            });
        });
    });

});
