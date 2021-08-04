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

  ngOnInit() {
    this.mainForm = new FormGroup({
      start: new FormControl(),
      end: new FormControl(),
    });
    this.mainservice
      .getIRTransaction(this.d.getTime() - 2591989407, this.d.getTime())
      .then((document) => {
        this.transactions = document[0];
        this.fillOwnerArray(document[1]);
        // document[0].forEach((element) => {
        //   this.map1.set(element.cusId, element);
        // });
        // console.log(this.map1);
        // document[1].forEach((element) => {
        //   console.log(this.map1.get(element._id));
        //   this.transactionsOwners.push(this.map1.get(element._id));
        // });
        // console.log(this.transactionsOwners);
      });
  }
  print() {
    window.print();
  }
  show() {
    let obj = this.mainForm.value;
    console.log(obj.start, obj.end);
    this.mainservice
      .getIRTransaction(obj.start.getTime(), obj.end.getTime())
      .then((document) => {
        console.log('transaction', document);
        this.transactions = document[0];
        this.fillOwnerArray(document[1]);
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
        console.log(array[this.map1.get(this.transactions[i].cusId)]);
        this.transactionsOwners.push(
          array[this.map1.get(this.transactions[i].cusId)]
        );
        minusCount++;
      }
    }
  }
}
