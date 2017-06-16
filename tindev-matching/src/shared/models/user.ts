export class User {

	specId : number;
 
  constructor(public id:number, public firstname: string, public lastname: string, public recruiter: boolean, public email: string, public completedProfile: boolean, public token: string) {
  }
}