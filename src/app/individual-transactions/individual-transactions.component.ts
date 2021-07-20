import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MainServiceService } from '../main-service.service';
import { Subject } from 'rxjs';
import { ReturnDialogueComponent } from '../return-dialogue/return-dialogue.component';

@Component({
  selector: 'app-individual-transactions',
  templateUrl: './individual-transactions.component.html',
  styleUrls: ['./individual-transactions.component.css'],
})
export class IndividualTransactionsComponent implements OnChanges {
  indiTrans;
  it_data = new Subject<{}>();
  @Input() itData;
  @Output() closeComponent = new EventEmitter<any>();

  constructor(
    private mainservice: MainServiceService,
    public dialog: MatDialog
  ) {}
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
  return(i) {
    this.dialog.open(ReturnDialogueComponent, { data: this.indiTrans[i] });
  }
}
