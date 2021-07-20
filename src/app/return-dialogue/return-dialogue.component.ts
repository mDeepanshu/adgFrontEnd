import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MainServiceService } from '../main-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-return-dialogue',
  templateUrl: './return-dialogue.component.html',
  styleUrls: ['./return-dialogue.component.css'],
})
export class ReturnDialogueComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private mainservice: MainServiceService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}
  return(collectedAmount) {
    let returnTransaction = {
      issueRef: this.data._id,
      returnDate: new Date(),
      profit: Number(collectedAmount) - Number(this.data.principle),
    };
    this.mainservice.addReturnTransaction(returnTransaction).then(() => {
      this._snackBar.open('Transaction Returned', 'Close');
    });
  }
}
