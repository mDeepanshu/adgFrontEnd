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
      .getIRTransaction(
        `${this.d.getDate()}/${this.d.getMonth()}/${this.d.getFullYear()}`,
        `${this.d.getDate()}/${
          Number(this.d.getMonth()) + 1
        }/${this.d.getFullYear()}`
      )
      .then((document) => {
        this.transactions = document[0];
        let minusCount = 0;
        for (let i = 0; i < document[0].length; i++) {
          if (this.map1.get(document[0][i].cusId) == undefined) {
            this.map1.set(document[0][i].cusId, i);
            this.transactionsOwners.push(document[1][i - minusCount]);
          } else {
            this.transactionsOwners.push(
              document[1][this.map1.get(document[0][i].cusId)]
            );
            minusCount++;
          }
        }
        console.log(this.map1);
      });
  }
  print() {
    window.print();
  }
  show() {
    this.mainservice
      .getIRTransaction(this.mainForm.value.start, this.mainForm.value.start)
      .then((document) => {
        console.log('transaction', document);
        this.transactions = document[0];
        this.transactionsOwners = document[1];
      });
  }
}
