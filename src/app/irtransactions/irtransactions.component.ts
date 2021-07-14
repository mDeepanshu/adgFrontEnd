import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-irtransactions',
  templateUrl: './irtransactions.component.html',
  styleUrls: ['./irtransactions.component.css'],
})
export class IRtransactionsComponent implements OnInit {
  constructor() {}
  transactionsOwners;
  transactions;
  mainForm: FormGroup;

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
