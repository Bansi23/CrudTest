import { Injectable } from '@angular/core';
import { ToasterService } from 'angular2-toaster';
//import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  private toasterService: ToasterService;


  displayToaster(type: number, title) {
    const messageType = type == 1 ? 'success' : type == 2 ? 'error' : type == 3 ? 'warning' : type == 4 ? 'info' : 'error';
    this.toasterService.pop(messageType, title);
  }

  custInfo() {
    return [
      { 'id': 1, 'fname': 'bansi', 'lname': 'patel', 'mono': 1234567890, 'email': 'bansi29@gmail.com' }
    ]
  }

  constructor(toasterService: ToasterService) {
   // this.notifier = notifierService;
   this.toasterService = toasterService;
  }
}
