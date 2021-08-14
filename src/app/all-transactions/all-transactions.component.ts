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
  allTransaction = [];
  limitedTransaction = [];
  transactionShown = 10;
  page = 1;
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
    // this.mainservice
    //   .getAllT(this.d.getTime() - 2591989407, this.d.getTime(), 1)
    //   .then((obj: { forTable; forTotal }) => {
    //     // console.log(transactions);
    //     this.allTransaction = obj.forTable;
    //     this.forTotal = obj.forTotal;
    //     console.log(this.forTotal);
    //   });
    this.show(1);
  }
  print() {
    window.print();
  }
  show(page) {
    let from, till;
    // if (page == 0 || this.page + page < 1) {
    //   this.page = 1;
    // } else {
    //   this.page += page;
    // }
    let obj = this.mainForm.value;
    if (obj.start == null || obj.end == null) {
      from = this.d.getTime() - 2591989407;
      till = this.d.getTime();
    } else {
      from = obj.start.getTime();
      till = obj.end.getTime();
    }
    this.mainservice
      .getAllT(from, till, this.page)
      .then((obj: { forTable; forTotal }) => {
        // if (obj.forTable.length == 0) {
        // this.page--;
        // } else {
        this.allTransaction = obj.forTable;
        this.forTotal = obj.forTotal;
        this.limitedTransaction = this.allTransaction.slice(0, 10);
        // }
      });
  }
  approve(i) {}
  decline(i) {}
  inti() {
    console.log('sadf');
  }
  onScroll() {
    if (this.allTransaction.length > this.limitedTransaction.length) {
      console.log('scrolled!!');
      this.limitedTransaction.concat(
        this.allTransaction.slice(
          this.transactionShown,
          this.transactionShown + 10
        )
      );
      this.limitedTransaction = [
        ...this.limitedTransaction,
        ...this.allTransaction.slice(
          this.transactionShown,
          this.transactionShown + 10
        ),
      ];
      this.transactionShown += 10;
      console.log(this.limitedTransaction, this.transactionShown);
    }
  }
}
