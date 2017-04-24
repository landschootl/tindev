import { Routes } from '@angular/router';

import { ExperienceComponent } from './experience.component';
import { ExperienceDetailComponent } from './experience-detail.component';
import { ExperiencePopupComponent } from './experience-dialog.component';
import { ExperienceDeletePopupComponent } from './experience-delete-dialog.component';

export const experienceRoute: Routes = [
  {
    path: 'experience',
    component: ExperienceComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'tindevApp.experience.home.title'
    }
  }, {
    path: 'experience/:id',
    component: ExperienceDetailComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'tindevApp.experience.home.title'
    }
  }
];

export const experiencePopupRoute: Routes = [
  {
    path: 'experience-new',
    component: ExperiencePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'tindevApp.experience.home.title'
    },
    outlet: 'popup'
  },
  {
    path: 'experience/:id/edit',
    component: ExperiencePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'tindevApp.experience.home.title'
    },
    outlet: 'popup'
  },
  {
    path: 'experience/:id/delete',
    component: ExperienceDeletePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'tindevApp.experience.home.title'
    },
    outlet: 'popup'
  }
];
