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
  d = new Date();
  reportsValue = [];
  page = 1;
  ngOnInit() {
    this.mainForm = new FormGroup({
      start: new FormControl(),
      end: new FormControl(),
    });
    this.mainservice
      .getRT(this.d.getTime() - 2591989407, this.d.getTime(), 1)
      .then((document) => {
        this.returnedTransactions = document[0];
        this.returnedTransactionsOwners = document[1];
      });
    this.mainservice.getReportsValue().then((ReportsValue: { values; _id }) => {
      this.reportsValue = ReportsValue.values;
      console.log(ReportsValue);
    });
  }
  show(page) {
    let from, till;
    if (page == 0 || this.page + page < 1) {
      this.page = 1;
    } else {
      this.page += page;
    }
    let obj = this.mainForm.value;
    if (obj.start == null || obj.end == null) {
      from = this.d.getTime() - 2591989407;
      till = this.d.getTime();
    } else {
      from = obj.start.getTime();
      till = obj.end.getTime();
    }
    this.mainservice.getRT(from, till, this.page).then((document) => {
      if (document[0].length == 0) {
        this.page--;
      } else {
        this.returnedTransactions = document[0];
        this.returnedTransactionsOwners = document[1];
      }
    });
  }
}
