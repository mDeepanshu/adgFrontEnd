import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { AppComponent } from './app.component';
import { CustomersComponent } from './customers/customers.component';
import { AllTransactionsComponent } from './all-transactions/all-transactions.component';
import { DebitCreditComponent } from './debit-credit/debit-credit.component';
import { IRtransactionsComponent } from './irtransactions/irtransactions.component';
import { ReportsComponent } from './reports/reports.component';
import { IndividualTransactionsComponent } from './individual-transactions/individual-transactions.component';
import { HomePageComponent } from './home-page/home-page.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NewTransactionComponent } from './new-transaction/new-transaction.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'Customers-component', component: CustomersComponent },
  { path: 'AllTransactions-component', component: AllTransactionsComponent },
  { path: 'DebitCredit-component', component: DebitCreditComponent },
  { path: 'IRtransactions-component', component: IRtransactionsComponent },
  { path: 'IndiTran-component', component: IndividualTransactionsComponent },
  { path: 'Reports-component', component: ReportsComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    CustomersComponent,
    AllTransactionsComponent,
    DebitCreditComponent,
    IRtransactionsComponent,
    ReportsComponent,
    IndividualTransactionsComponent,
    HomePageComponent,
    HeaderComponent,
    LoginComponent,
    NewTransactionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatInputModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatSnackBarModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
