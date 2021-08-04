import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'adjFrontEnd';
  login = true;
  onLogin(status) {
    this.login = !status;
  }
  logout() {
    console.log('asdf');
    this.login = true;
  }
}
