import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonService } from '../common.service';
import { environment } from 'src/environments/environment';
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
  lstHeader: any =  ['', 'First Name', 'Last Name', 'Mobile No.', 'Email', 'Actions']

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
      if (list.length !== 0) {
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
      this.close();
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
      this.updateIndex = -1;
    }
  }

  cancelEdit(i) {
    this.lstUser[i] = this.editData;
    this.editData = null;
    this.updateIndex = -1;
  }

  deleteRecord(i) {
    this.lstUser.splice(i, 1)
  }

  constructor(private fb: FormBuilder, private _cS: CommonService) { }

  ngOnInit() {
    this.lstUser = this._cS.custInfo();
    this.lstUser.map(x => {
      x.isSelect = this.isChecked;
    });
    this.fbValidation();
  }
}
