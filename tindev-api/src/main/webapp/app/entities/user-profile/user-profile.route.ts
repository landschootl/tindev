import { Routes } from '@angular/router';

import { UserProfileComponent } from './user-profile.component';
import { UserProfileDetailComponent } from './user-profile-detail.component';
import { UserProfilePopupComponent } from './user-profile-dialog.component';
import { UserProfileDeletePopupComponent } from './user-profile-delete-dialog.component';

export const userProfileRoute: Routes = [
  {
    path: 'user-profile',
    component: UserProfileComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'tindevApp.userProfile.home.title'
    }
  }, {
    path: 'user-profile/:id',
    component: UserProfileDetailComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'tindevApp.userProfile.home.title'
    }
  }
];

export const userProfilePopupRoute: Routes = [
  {
    path: 'user-profile-new',
    component: UserProfilePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'tindevApp.userProfile.home.title'
    },
    outlet: 'popup'
  },
  {
    path: 'user-profile/:id/edit',
    component: UserProfilePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'tindevApp.userProfile.home.title'
    },
    outlet: 'popup'
  },
  {
    path: 'user-profile/:id/delete',
    component: UserProfileDeletePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'tindevApp.userProfile.home.title'
    },
    outlet: 'popup'
  }
];
