import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MainServiceService } from '../main-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-new-transaction',
  templateUrl: './new-transaction.component.html',
  styleUrls: ['./new-transaction.component.css'],
})
export class NewTransactionComponent implements OnInit {
  constructor(
    private mainservice: MainServiceService,
    private _snackBar: MatSnackBar
  ) {}
  borrowStatus = false;
  transactionForm: FormGroup;
  @Input() newTrData = '';
  public date =
    new Date().getDate() +
    '/' +
    new Date().getMonth() +
    '/' +
    new Date().getFullYear();
  ngOnInit() {
    this.transactionForm = new FormGroup({
      itemName: new FormControl(null, Validators.required),
      roi: new FormControl(null, Validators.required),
      principle: new FormControl(null, Validators.required),
      weight: new FormControl(null, Validators.required),
    });
  }

  onSaveForm() {
    let obj = this.transactionForm.value;
    obj.cusId = this.newTrData;
    obj.issueDate = new Date().getTime();
    this.mainservice.addTransaction(this.transactionForm.value).then(() => {
      this._snackBar.open('Transaction Saved', 'Close');
      this.transactionForm.reset();
    });
  }
  borrow() {
    console.log(this.borrowStatus);
    if (this.borrowStatus) {
      this.transactionForm.get('roi').setValidators(Validators.required);
      this.transactionForm.get('itemName').setValidators(Validators.required);
      this.transactionForm.get('weight').setValidators(Validators.required);
    } else {
      this.transactionForm.get('roi').clearValidators();
      this.transactionForm.get('itemName').clearValidators();
      this.transactionForm.get('weight').clearValidators();
    }
    this.transactionForm.get('roi').updateValueAndValidity();
    this.transactionForm.get('itemName').updateValueAndValidity();
    this.transactionForm.get('weight').updateValueAndValidity();
  }
}
