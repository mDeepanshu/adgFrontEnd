import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MainServiceService } from '../main-service.service';

@Component({
  selector: 'app-individual-transactions',
  templateUrl: './individual-transactions.component.html',
  styleUrls: ['./individual-transactions.component.css'],
})
export class IndividualTransactionsComponent implements OnInit {
  @Input() itData;
  @Output() closeComponent = new EventEmitter<any>();
  constructor(private mainservice: MainServiceService) {}
  indiTrans;
  ngOnInit() {
    console.log(this.itData);
    this.mainservice
      .getTransaction(this.itData.id, this.itData.transactionArray)
      .then((array) => {
        console.log(array);
        this.indiTrans = array;
      });
  }
  close() {
    console.log(this.itData);
    this.closeComponent.emit();
  }
}
