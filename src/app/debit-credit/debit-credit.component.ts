import { Component, OnInit } from '@angular/core';
import { MainServiceService } from '../main-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-debit-credit',
  templateUrl: './debit-credit.component.html',
  styleUrls: ['./debit-credit.component.css'],
})
export class DebitCreditComponent implements OnInit {
  constructor(
    private mainservice: MainServiceService,
    private _snackBar: MatSnackBar
  ) {}
  projectForm: FormGroup;
  dateForm: FormGroup;
  d = new Date();
  page = 1;

  dcArray;
  dcType = 'CREDIT';
  ngOnInit() {
    this.projectForm = new FormGroup({
      amount: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      type: new FormControl(false),
    });
    this.dateForm = new FormGroup({
      start: new FormControl(),
      end: new FormControl(),
    });
    // this.mainservice
    //   .getDC(this.d.getTime() - 2591989407, this.d.getTime(), this.page)
    //   .then((data) => {
    //     console.log(data);
    //     this.dcArray = data;
    //   });
    this.show(0);
  }
  onSaveForm() {
    this.projectForm.value.date = new Date().getTime();
    console.log(this.projectForm.value);
    if (this.projectForm.value.type) {
      this.projectForm.value.type = 'DEBIT';
    } else {
      this.projectForm.value.type = 'CREDIT';
    }

    this.mainservice.newDC(this.projectForm.value).then(() => {
      this._snackBar.open('Debit Credit Saved', 'Close');
      this.dcArray.push(this.projectForm.value);
      this.projectForm.reset();
    });
  }
  typeSelect() {
    console.log(this.projectForm.value.type);
    if (this.projectForm.value.type) {
      this.dcType = 'CREDIT';
    } else {
      this.dcType = 'DEBIT';
    }
  }
  show(page) {
    let from, till;
    if (page == 0 || this.page + page < 1) {
      this.page = 1;
    } else {
      this.page += page;
    }
    let obj = this.dateForm.value;
    if (obj.start == null || obj.end == null) {
      from = this.d.getTime() - 2591989407;
      till = this.d.getTime();
    } else {
      from = obj.start.getTime();
      till = obj.end.getTime();
    }
    this.mainservice.getDC(from, till, this.page).then((data: []) => {
      if (data.length == 0) {
        this.page--;
      } else {
        console.log(data);
        this.dcArray = data;
      }
    });
  }
}
