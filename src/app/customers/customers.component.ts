import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MainServiceService } from '../main-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css'],
})
export class CustomersComponent implements OnInit {
  constructor(
    private mainservice: MainServiceService,
    private _snackBar: MatSnackBar
  ) {}
  itComponent: boolean = false; // it - Individual Transaction
  sideBar: boolean = false;
  projectForm: FormGroup;
  itData; // it - Individual Transaction
  newTrData = ''; //New Transaction Data
  customers;
  optionsName;
  optionsPhone;
  public timer;
  onPage = 1;

  ngOnInit() {
    this.projectForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      fatherName: new FormControl(null, Validators.required),
      caste: new FormControl(null, Validators.required),
      phone: new FormControl(null, Validators.required),
      village: new FormControl(null, Validators.required),
    });
    this.pageChange(0);
    // this.mainservice.getCustomer(1).then((data) => {
    //   console.log(data);
    //   this.customers = data;
    // });
  }

  onSaveForm() {
    this.mainservice.addCustomer(this.projectForm.value).then(() => {
      this._snackBar.open('Customer Saved', 'Close');
      this.customers.push(this.projectForm.value);
      this.projectForm.reset();
    });
  }

  close() {
    this.itComponent = false;
  }
  open(i) {
    this.itData = {
      id: this.customers[i]._id,
      transactionArray: this.customers[i].transactions,
    };
    this.itComponent = true;
  }

  /* Set the width of the sidebar to 250px and the left margin of the page content to 250px */
  openNav(i) {
    document.getElementById('mySidebar').style.width = '550px';
    document.getElementById('main').style.marginLeft = '550px';
    this.sideBar = true;
    this.newTrData = this.customers[i]._id;
  }

  /* Set the width of the sidebar to 0 and the left margin of the page content to 0 */
  closeNav() {
    this.sideBar = false;
    document.getElementById('mySidebar').style.width = '0';
    document.getElementById('main').style.marginLeft = '0';
  }
  //
  async autoComplete(field) {
    clearTimeout(this.timer);
    let value;
    switch (field) {
      case 'name':
        value = 'name';
        break;
      case 'phone':
        value = 'phone';
        break;
    }
    this.timer = setTimeout(async () => {
      let array = await this.mainservice.autoCompleteName(
        field,
        this.projectForm.value[value]
      );
      this.customers = array;
    }, 500);
  }
  pageChange(direc) {
    this.onPage += direc;
    if (this.onPage < 1) {
      this.onPage = 1;
    }
    console.log(this.onPage);
    this.mainservice.getCustomer(this.onPage).then((data: []) => {
      if (data.length == 0) {
        this.onPage--;
      } else {
        this.customers = data;
      }
    });
  }
}
