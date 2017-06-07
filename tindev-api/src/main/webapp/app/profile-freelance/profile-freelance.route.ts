import {Routes} from "@angular/router";

import {UserRouteAccessService} from "../shared";
import {ProfileFreelanceComponent} from "./profile-freelance.component";

export const profileFreelanceRoute: Routes = [{
  path: 'profilfreelance',
  component: ProfileFreelanceComponent,
  data: {
    authorities: ['ROLE_USER'],
    pageTitle: 'profilefreelance.title'
  },
  canActivate: [UserRouteAccessService]
}];
