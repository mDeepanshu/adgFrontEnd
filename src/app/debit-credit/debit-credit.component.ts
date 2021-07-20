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
  dcArray;
  ngOnInit() {
    this.projectForm = new FormGroup({
      amount: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
    });
    this.mainservice.getDC().then((data) => {
      console.log(data);
      this.dcArray = data;
    });
  }
  onSaveForm() {
    this.projectForm.value.date = new Date();
    this.projectForm.value.type = 'DC';

    console.log(this.projectForm.value);

    this.mainservice.newDC(this.projectForm.value).then(() => {
      this._snackBar.open('Debit Credit Saved', 'Close');
      this.dcArray.push(this.projectForm.value);
      this.projectForm.reset();
    });
  }
}
