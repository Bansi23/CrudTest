import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  custInfo() {
    return [
      { 'id': 1, 'fname': 'bansi', 'lname': 'patel', 'mono': 1234567890 }
    ]
  }

  constructor() { }
}
