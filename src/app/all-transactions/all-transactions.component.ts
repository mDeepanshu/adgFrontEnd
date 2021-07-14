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
  ngOnInit() {
    this.mainForm = new FormGroup({
      start: new FormControl(),
      end: new FormControl(),
    });
    this.mainservice.getAllT().then((transactions) => {
      this.allTransaction = transactions;
    });
  }
  print() {
    window.print();
  }
}
