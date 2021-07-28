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

  ngOnInit() {
    this.mainForm = new FormGroup({
      start: new FormControl(),
      end: new FormControl(),
    });
    this.mainservice
      .getAllT(this.d.getTime() - 2591989407, this.d.getTime())
      .then((transactions) => {
        this.allTransaction = transactions;
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
      .then((transactions) => {
        this.allTransaction = transactions;
      });
  }
  approve(i) {}
  decline(i) {}
}
