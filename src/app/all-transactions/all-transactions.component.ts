import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-all-transactions',
  templateUrl: './all-transactions.component.html',
  styleUrls: ['./all-transactions.component.css'],
})
export class AllTransactionsComponent implements OnInit {
  constructor() {}
  mainForm: FormGroup;
  allTransaction;
  ngOnInit() {
    this.mainForm = new FormGroup({
      start: new FormControl(),
      end: new FormControl(),
    });
  }
  print() {
    window.print();
  }
}
