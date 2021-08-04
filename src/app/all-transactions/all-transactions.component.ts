import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MainServiceService } from '../main-service.service';

@Component({
  selector: 'app-all-transactions',
  templateUrl: './all-transactions.component.html',
  styleUrls: ['./all-transactions.component.css'],
})
export class AllTransactionsComponent implements OnInit {
  constructor(private mainservice: MainServiceService) {}
  mainForm: FormGroup;
  allTransaction;
  d = new Date();
  forTotal = {
    DEBIT: 0,
    CREDIT: 0,
    ISSUE: 0,
    RETURN: 0,
  };
  ngOnInit() {
    this.mainForm = new FormGroup({
      start: new FormControl(),
      end: new FormControl(),
    });
    this.mainservice
      .getAllT(this.d.getTime() - 2591989407, this.d.getTime())
      .then((obj: { forTable; forTotal }) => {
        // console.log(transactions);
        this.allTransaction = obj.forTable;
        this.forTotal = obj.forTotal;
        console.log(this.forTotal);
      });
  }
  print() {
    window.print();
  }
  show() {
    let obj = this.mainForm.value;
    console.log(obj.start, obj.end);
    this.mainservice
      .getAllT(obj.start.getTime(), obj.end.getTime())
      .then((obj: { forTable; forTotal }) => {
        this.allTransaction = obj.forTable;
        this.forTotal = obj.forTotal;
      });
  }
  approve(i) {}
  decline(i) {}
  inti() {
    console.log('sadf');
  }
}
