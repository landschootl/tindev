import { Headers } from '@angular/http';
export class ApiUtils {
  base_url:string;
 
  constructor() {
    this.base_url = "http://127.0.0.1:9000/api/";
  }

  public getHeadersWithToken(token:string):Headers {
  	let headers = new Headers();
  	headers.append('Authorization', 'Bearer ' + token);
  	return headers;
  }
}