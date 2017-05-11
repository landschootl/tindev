export class User {
  firstname: string;
  lastname: string;
  email: string;
  recruiter: boolean;
  completedProfile:boolean;
 
  constructor(firstname: string, lastname: string, recruiter: boolean, email: string, completedProfile: boolean) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.recruiter = recruiter;
    this.email = email;
    this.completedProfile = completedProfile;
  }
}