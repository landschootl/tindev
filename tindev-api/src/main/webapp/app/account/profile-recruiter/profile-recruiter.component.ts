import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'jhi-profile-recruiter',
  templateUrl: './profile-recruiter.component.html',
  styles: []
})
export class ProfileRecruiterComponent implements OnInit {

    @Input() settingsAccount: any;

  constructor() { }

  ngOnInit() {
  }

}
