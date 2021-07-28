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
}
