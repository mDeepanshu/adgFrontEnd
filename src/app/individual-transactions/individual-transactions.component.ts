import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
} from '@angular/core';
import { MainServiceService } from '../main-service.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-individual-transactions',
  templateUrl: './individual-transactions.component.html',
  styleUrls: ['./individual-transactions.component.css'],
})
export class IndividualTransactionsComponent implements OnChanges {
  @Input() itData;
  it_data = new Subject<{}>();
  @Output() closeComponent = new EventEmitter<any>();
  constructor(private mainservice: MainServiceService) {}
  indiTrans;
  ngOnInit(): void {}
  close() {
    console.log(this.itData);
    this.closeComponent.emit();
  }
  loadData() {}
  ngOnChanges(changes) {
    console.log(changes);
    this.mainservice
      .getTransaction(
        changes.itData.currentValue.id,
        changes.itData.currentValue.transactionArray
      )
      .then((array) => {
        this.indiTrans = array;
      });
  }
}
