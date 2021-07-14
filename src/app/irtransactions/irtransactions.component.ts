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
  transactionsOwners;
  transactions;
  mainForm: FormGroup;

  ngOnInit() {
    this.mainForm = new FormGroup({
      start: new FormControl(),
      end: new FormControl(),
    });
    this.mainservice.getIRTransaction().then((transaction) => {
      this.transactions = transaction;
    });
  }
  print() {
    window.print();
  }
}
