import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MainServiceService } from '../main-service.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css'],
})
export class ReportsComponent implements OnInit {
  constructor(private mainservice: MainServiceService) {}
  returnedTransactions;
  mainForm: FormGroup;
  returnedTransactionsOwners;
  reportsValue = [];
  ngOnInit() {
    this.mainForm = new FormGroup({
      start: new FormControl(),
      end: new FormControl(),
    });
    this.mainservice.getRT().then((document) => {
      this.returnedTransactions = document[0];
      this.returnedTransactionsOwners = document[1];
    });
    this.mainservice.getReportsValue().then((ReportsValue: { values; _id }) => {
      this.reportsValue = ReportsValue.values;
      console.log(ReportsValue);
    });
  }
}
