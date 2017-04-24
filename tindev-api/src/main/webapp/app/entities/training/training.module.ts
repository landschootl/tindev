import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TindevSharedModule } from '../../shared';

import {
    TrainingComponent,
    TrainingDeleteDialogComponent,
    TrainingDeletePopupComponent,
    TrainingDetailComponent,
    TrainingDialogComponent,
    TrainingPopupComponent,
    trainingPopupRoute,
    TrainingPopupService,
    trainingRoute,
    TrainingService
} from './';

const ENTITY_STATES = [
    ...trainingRoute,
    ...trainingPopupRoute,
];

@NgModule({
    imports: [
        TindevSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        TrainingComponent,
        TrainingDetailComponent,
        TrainingDialogComponent,
        TrainingDeleteDialogComponent,
        TrainingPopupComponent,
        TrainingDeletePopupComponent,
    ],
    entryComponents: [
        TrainingComponent,
        TrainingDialogComponent,
        TrainingPopupComponent,
        TrainingDeleteDialogComponent,
        TrainingDeletePopupComponent,
    ],
    providers: [
        TrainingService,
        TrainingPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TindevTrainingModule {}
