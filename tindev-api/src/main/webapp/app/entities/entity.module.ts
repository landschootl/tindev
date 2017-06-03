import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { TindevUserProfileModule } from './user-profile/user-profile.module';
import { TindevRecruiterModule } from './recruiter/recruiter.module';
import { TindevFreelanceModule } from './freelance/freelance.module';
import { TindevMissionModule } from './mission/mission.module';
import { TindevSkillModule } from './skill/skill.module';
import { TindevDomainModule } from './domain/domain.module';
import { TindevSpecialtyModule } from './specialty/specialty.module';
import { TindevDiscussionModule } from './discussion/discussion.module';
import { TindevExperienceModule } from './experience/experience.module';
import { TindevTrainingModule } from './training/training.module';
import { TindevMessageModule } from './message/message.module';
import { TindevUserMatchingModule } from './user-matching/user-matching.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        TindevUserProfileModule,
        TindevRecruiterModule,
        TindevFreelanceModule,
        TindevMissionModule,
        TindevSkillModule,
        TindevDomainModule,
        TindevSpecialtyModule,
        TindevDiscussionModule,
        TindevExperienceModule,
        TindevTrainingModule,
        TindevMessageModule,
        TindevUserMatchingModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TindevEntityModule {}
