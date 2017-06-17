import { Routes } from '@angular/router';

import { MissionComponent } from './mission.component';
import { MissionDetailComponent } from './mission-detail.component';
import { MissionPopupComponent } from './mission-dialog.component';
import { MissionDeletePopupComponent } from './mission-delete-dialog.component';

export const missionRoute: Routes = [
    {
        path: 'mission',
        component: MissionComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'tindevApp.mission.home.title'
        }
    }, {
        path: 'mission/:id',
        component: MissionDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'tindevApp.mission.home.title'
        }
    }
];

export const missionPopupRoute: Routes = [
    {
        path: 'mission-new',
        component: MissionPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'tindevApp.mission.home.title'
        },
        outlet: 'popup'
    },
    {
        path: 'mission/:id/edit',
        component: MissionPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'tindevApp.mission.home.title'
        },
        outlet: 'popup'
    },
    {
        path: 'mission/:id/delete',
        component: MissionDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'tindevApp.mission.home.title'
        },
        outlet: 'popup'
    }
];
