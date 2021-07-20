import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MainServiceService } from '../main-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(private mainservice: MainServiceService) {}
  onPage: string = 'HOME';
  isStaff;
  @Output() logoutEvent = new EventEmitter<boolean>();
  accountType;
  ngOnInit() {
    this.mainservice.accountType.subscribe((value) => {
      console.log(value);
      if (value == 'ADMIN') {
        this.isStaff = false;
      } else {
        this.isStaff = true;
      }
      this.accountType = value;
    });
  }
  changePage(page: string) {
    this.onPage = page;
  }
  logout() {
    this.logoutEvent.emit();
  }
}
