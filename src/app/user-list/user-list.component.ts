import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonService } from '../common.service';
import { environment } from 'src/environments/environment';
import { interval } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { Router } from '@angular/router';
const emailPattern = environment.emailPattern;

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  @ViewChild('addRecModal', { static: false }) AddModalpopup: ModalDirective;
  custForm: FormGroup;
  lstUser: any = [];
  isChecked: boolean = false;
  updateIndex: number = -1;
  editData: any = null;
  isdisabled: boolean = true;
  lstHeader: any = ['', 'First Name', 'Last Name', 'Mobile No.', 'Email', 'Actions']
  filter: any;
  p: number = 1;
  public loading = false;

  pageIndex: number = 1;
  pageSize: number = 2;


  title = 'toaster';



  fbValidation() {
    this.custForm = this.fb.group({
      fname: [null, Validators.compose([Validators.required, Validators.pattern('[A-Za-z]{2,}')])],
      lname: [null, Validators.compose([Validators.required, Validators.pattern('[A-Za-z]{2,}')])],
      mono: [null, Validators.compose([Validators.required, Validators.pattern('[0-9]\\d{9}')])],
      email: [null, Validators.compose([Validators.required, Validators.pattern(emailPattern)])],
    });
  }


  addRecord() {
    this.custForm.reset();
    this.AddModalpopup.show();
  }
  close() {
    this.AddModalpopup.hide();
  }
  deleteSelectedRecord() {
    if (this.lstUser.length === 0) {
      alert('No record found!');
    }
    else {
      const list = this.lstUser.filter(x => x.isSelect == false);
      const listTrue = this.lstUser.filter(x => x.isSelect == true);
      if (listTrue.length == 0) {
        alert('Select at list one record!');
      } else {
        this.lstUser = list;
      }
    }
  }

  getSelectval(evt, i) {
    let data = this.lstUser[i];
    //this.lstUser[i] = this.getData(data, evt);
    this.lstUser[i] = {
      id: data.id,
      fname: data.fname,
      lname: data.lname,
      mono: data.mono,
      email: data.email,
      isSelect: evt
    };
  }

  saveRecord() {
    for (const i in this.custForm.controls) {
      this.custForm.controls[i].markAllAsTouched();
    }
    if (this.custForm.valid) {
      this.loading = true;
    setTimeout(() => {
      const formVal = this.custForm.value;
      const index = this.lstUser.findIndex(x => x.id == formVal.id);
      if (index > -1) {
        this.lstUser.splice(index, 1, formVal);
      } else {
        formVal.id = (new Date().getTime());
        this.lstUser.push(formVal);
        this.lstUser.map(x => {
          x.isSelect = this.isChecked;
        });
      }
      this._cS.displayToaster(1, 'Added record successfuly');
      this.close();
      this.loading = false;
    }, 2000);
    }
  }

  getData(data, evt?) {
    let d = {
      id: data.id,
      fname: data.fname,
      lname: data.lname,
      mono: data.mono,
      email: data.email,
      isselect: evt ? evt : data.isSelect
    };
    return d;
  }

  editRecord(i) {
    this.updateIndex = i;
    if (i > -1) {
      let data = this.lstUser[i];
      this.lstUser[i] = this.getData(data);
      this.editData = this.getData(data);
    };
  }

  saveChanges(i) {

    for (const i in this.custForm.controls) {
      this.custForm.controls[i].markAllAsTouched();
    }
    if (this.custForm.valid) {
      let data = this.lstUser[i];
      this.lstUser[i] = this.getData(data);
      this._cS.displayToaster(1, 'Updated record successfuly');
      this.updateIndex = -1;
    }
  }

  cancelEdit(i) {
    this.lstUser[i] = this.editData;
    this.editData = null;
    this.updateIndex = -1;
  }

  deleteRecord(i) {
    this.lstUser.splice(i, 1);
    this._cS.displayToaster(2, 'Delete record successfuly');
  }

  pageChanged(value) {
    this.pageIndex = +value;
  };

  // resetDiscount() {
  //   this._cS.displayToaster(2,'Enter valid Discount');
  //   this.discountForm.get('discount').setValue('');
  // }

  // currencyCheck() {
  //   const currencyCode = this.discountForm.get('_currencyCode').value;
  //   const discount = this.discountForm.get('discount').value;

  //   if (discount != undefined || discount != '' || discount != null) {
  //     const length = discount.toString().length;
  //     if (currencyCode != null) {
  //       if (currencyCode.name == '%') {
  //         if (discount >= 100) {
  //           this.resetDiscount();
  //         }
  //       }
  //       else if (currencyCode.name == '$') {
  //         if (length > 4) {
  //           this.resetDiscount();
  //         }
  //       }
  //     }
  //   }
  // }

  // goSearch() {
  //   const searchData = this.searching.value;
  //   if (searchData === '' || this.searching.invalid) {
  //     this.lstDiscount = this.discountInfo;
  //   } else {
  //     this.data = this.discountInfo;
  //     let filtered = this.data.filter(
  //       x => x.name.toLocaleLowerCase().replace(/ /g, '').includes(searchData.toLocaleLowerCase().replace(/ /g, ''))
  //         || x.code.toLocaleLowerCase().replace(/ /g, '').includes(searchData.toLocaleLowerCase().replace(/ /g, ''))
  //         || x.startDate.toLocaleLowerCase().replace(/ /g, '').includes(searchData.toLocaleLowerCase().replace(/ /g, ''))
  //         || x.expiryDate.toLocaleLowerCase().replace(/ /g, '').includes(searchData.toLocaleLowerCase().replace(/ /g, ''))
  //     );
  //     this.lstDiscount = filtered;
  //     if (filtered.length === 0) {
  //       this.notify.error('no record found.');
  //     }
  //   }
  // }


  fun() {
    interval(0)
    .pipe(
      take(1), 
    ).subscribe(value => 
      this._router.navigate(['account/login']));
   }

  constructor(private fb: FormBuilder, private _cS: CommonService, private _router : Router) { }

  ngOnInit() {
    this.lstUser = this._cS.custInfo();
    this.lstUser.map(x => {
      x.isSelect = this.isChecked;
    });
    this.fbValidation();
  }
}
