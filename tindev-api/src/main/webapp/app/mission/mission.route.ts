import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../shared';
import { EditMissionComponent } from './mission.edit.component';

export const manageMissionRoute: Routes = [{
    path: 'editmission',
    component: EditMissionComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'editmission.title'
    },
    canActivate: [UserRouteAccessService]
}];
