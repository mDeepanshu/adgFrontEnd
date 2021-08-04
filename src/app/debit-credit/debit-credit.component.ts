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
    this.mainservice
      .getDC(this.d.getTime() - 2591989407, this.d.getTime())
      .then((data) => {
        console.log(data);
        this.dcArray = data;
      });
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
  show() {
    let obj = this.dateForm.value;
    this.mainservice
      .getDC(obj.start.getTime(), obj.end.getTime())
      .then((data) => {
        console.log(data);
        this.dcArray = data;
      });
  }
}
