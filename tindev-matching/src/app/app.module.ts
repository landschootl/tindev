import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { MatchingPage } from '../pages/matching/matching';
import { RegisterPage } from '../pages/register/register';
import { SwingModule } from 'angular2-swing';
import { HttpModule } from '@angular/http';
import { CapitalizePipe } from '../shared/pipes/capitalize.pipe';
import { TindevSession } from '../providers/tindev-session';
import { AuthService } from '../providers/auth-service';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MatchingPage,
    RegisterPage,
    CapitalizePipe
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    SwingModule,
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    MatchingPage,
    RegisterPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, TindevSession, AuthService]
})
export class AppModule {}
