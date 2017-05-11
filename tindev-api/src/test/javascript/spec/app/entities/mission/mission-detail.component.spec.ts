import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { DateUtils, DataUtils, EventManager } from 'ng-jhipster';
import { TindevTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { MissionDetailComponent } from '../../../../../../main/webapp/app/entities/mission/mission-detail.component';
import { MissionService } from '../../../../../../main/webapp/app/entities/mission/mission.service';
import { Mission } from '../../../../../../main/webapp/app/entities/mission/mission.model';

describe('Component Tests', () => {

    describe('Mission Management Detail Component', () => {
        let comp: MissionDetailComponent;
        let fixture: ComponentFixture<MissionDetailComponent>;
        let service: MissionService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TindevTestModule],
                declarations: [MissionDetailComponent],
                providers: [
                    DateUtils,
                    DataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    MissionService,
                    EventManager
                ]
            }).overrideComponent(MissionDetailComponent, {
                set: {
                    template: ''
                }
            }).compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MissionDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MissionService);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Mission(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.mission).toEqual(jasmine.objectContaining({id:10}));
            });
        });
    });

});
