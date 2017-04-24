import { Routes } from '@angular/router';

import { TrainingComponent } from './training.component';
import { TrainingDetailComponent } from './training-detail.component';
import { TrainingPopupComponent } from './training-dialog.component';
import { TrainingDeletePopupComponent } from './training-delete-dialog.component';


export const trainingRoute: Routes = [
  {
    path: 'training',
    component: TrainingComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'tindevApp.training.home.title'
    }
  }, {
    path: 'training/:id',
    component: TrainingDetailComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'tindevApp.training.home.title'
    }
  }
];

export const trainingPopupRoute: Routes = [
  {
    path: 'training-new',
    component: TrainingPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'tindevApp.training.home.title'
    },
    outlet: 'popup'
  },
  {
    path: 'training/:id/edit',
    component: TrainingPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'tindevApp.training.home.title'
    },
    outlet: 'popup'
  },
  {
    path: 'training/:id/delete',
    component: TrainingDeletePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'tindevApp.training.home.title'
    },
    outlet: 'popup'
  }
];
