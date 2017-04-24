import { Routes } from '@angular/router';

import { FreelanceComponent } from './freelance.component';
import { FreelanceDetailComponent } from './freelance-detail.component';
import { FreelancePopupComponent } from './freelance-dialog.component';
import { FreelanceDeletePopupComponent } from './freelance-delete-dialog.component';


export const freelanceRoute: Routes = [
  {
    path: 'freelance',
    component: FreelanceComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'tindevApp.freelance.home.title'
    }
  }, {
    path: 'freelance/:id',
    component: FreelanceDetailComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'tindevApp.freelance.home.title'
    }
  }
];

export const freelancePopupRoute: Routes = [
  {
    path: 'freelance-new',
    component: FreelancePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'tindevApp.freelance.home.title'
    },
    outlet: 'popup'
  },
  {
    path: 'freelance/:id/edit',
    component: FreelancePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'tindevApp.freelance.home.title'
    },
    outlet: 'popup'
  },
  {
    path: 'freelance/:id/delete',
    component: FreelanceDeletePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'tindevApp.freelance.home.title'
    },
    outlet: 'popup'
  }
];
