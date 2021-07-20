import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MainServiceService } from '../main-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private mainservice: MainServiceService) {}

  ngOnInit(): void {}
  @Output() onLogin = new EventEmitter<boolean>();
  login(userName, password) {
    console.log(userName, password);
    this.mainservice.checkCredential(userName, password).then((data) => {
      if (data) {
        this.onLogin.emit(true);
      } else {
      }
    });
  }
}
