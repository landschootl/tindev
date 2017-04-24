import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SwingModule } from 'angular2-swing';
import { HttpModule } from '@angular/http';
import { CapitalizePipe } from '../shared/pipes/capitalize.pipe';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
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
    HomePage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
