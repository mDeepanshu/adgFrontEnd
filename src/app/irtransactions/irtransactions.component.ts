import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MainServiceService } from '../main-service.service';

@Component({
  selector: 'app-irtransactions',
  templateUrl: './irtransactions.component.html',
  styleUrls: ['./irtransactions.component.css'],
})
export class IRtransactionsComponent implements OnInit {
  constructor(private mainservice: MainServiceService) {}
  transactionsOwners = [];
  transactions;
  mainForm: FormGroup;
  d = new Date();
  map1 = new Map();
  page = 1;

  ngOnInit() {
    this.mainForm = new FormGroup({
      start: new FormControl(),
      end: new FormControl(),
    });
    this.mainservice
      .getIRTransaction(this.d.getTime() - 2591989407, this.d.getTime(), 1)
      .then((document) => {
        this.transactions = document[0];
        this.fillOwnerArray(document[1]);
      });
  }
  print() {
    window.print();
  }
  show(page) {
    let from, till;
    if (page == 0 || this.page + page < 1) {
      this.page = 1;
    } else {
      this.page += page;
    }
    console.log(this.page);
    let obj = this.mainForm.value;
    if (obj.start == null || obj.end == null) {
      from = this.d.getTime() - 2591989407;
      till = this.d.getTime();
    } else {
      from = obj.start.getTime();
      till = obj.end.getTime();
    }
    this.mainservice
      .getIRTransaction(from, till, this.page)
      .then((document) => {
        console.log(document[0]);
        if (document[0].length == 0) {
          this.page--;
        } else {
          this.transactions = document[0];
          this.fillOwnerArray(document[1]);
        }
      });
  }

  fillOwnerArray(array) {
    this.transactionsOwners = [];
    let minusCount = 0;
    for (let i = 0; i < this.transactions.length; i++) {
      if (this.map1.get(this.transactions[i].cusId) == undefined) {
        this.map1.set(this.transactions[i].cusId, i);
        this.transactionsOwners.push(array[i - minusCount]);
      } else {
        this.transactionsOwners.push(
          array[this.map1.get(this.transactions[i].cusId)]
        );
        minusCount++;
      }
    }
  }
}
