import { Routes } from '@angular/router';

import { RecruiterComponent } from './recruiter.component';
import { RecruiterDetailComponent } from './recruiter-detail.component';
import { RecruiterPopupComponent } from './recruiter-dialog.component';
import { RecruiterDeletePopupComponent } from './recruiter-delete-dialog.component';


export const recruiterRoute: Routes = [
  {
    path: 'recruiter',
    component: RecruiterComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'tindevApp.recruiter.home.title'
    }
  }, {
    path: 'recruiter/:id',
    component: RecruiterDetailComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'tindevApp.recruiter.home.title'
    }
  }
];

export const recruiterPopupRoute: Routes = [
  {
    path: 'recruiter-new',
    component: RecruiterPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'tindevApp.recruiter.home.title'
    },
    outlet: 'popup'
  },
  {
    path: 'recruiter/:id/edit',
    component: RecruiterPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'tindevApp.recruiter.home.title'
    },
    outlet: 'popup'
  },
  {
    path: 'recruiter/:id/delete',
    component: RecruiterDeletePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'tindevApp.recruiter.home.title'
    },
    outlet: 'popup'
  }
];
