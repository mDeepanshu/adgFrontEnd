import { Injectable } from '@angular/core';
import openSocket from 'socket.io-client';
import { HttpClient } from '@angular/common/http';
import { ResponseType } from './models/responseType';

@Injectable({
  providedIn: 'root',
})
export class MainServiceService {
  url = 'http://localhost:3000';

  constructor(private http: HttpClient) {
    openSocket('http://localhost:3000');
  }
  addCustomer(body) {
    return new Promise((response, reject) => {
      this.http
        .post(`${this.url}/customer/add_new`, body)
        .subscribe((responseData: ResponseType) => {
          let isError = this.checkForErr(
            responseData.status,
            responseData.message
          );
          if (isError) {
            reject('http request failed' + responseData.message);
          } else {
            response(responseData.message);
          }
        });
    });
  }
  addIssueTransaction(body) {
    return new Promise((response, reject) => {
      this.http
        .post(`${this.url}/transaction/new_issue`, body)
        .subscribe((responseData: ResponseType) => {
          let isError = this.checkForErr(
            responseData.status,
            responseData.message
          );
          if (isError) {
            reject('http request failed' + responseData.message);
          } else {
            response(responseData.message);
          }
        });
    });
  }
  addReturnTransaction(body) {
    return new Promise((response, reject) => {
      this.http
        .post(`${this.url}/transaction/add_returnTransaction`, body)
        .subscribe((responseData: ResponseType) => {
          let isError = this.checkForErr(
            responseData.status,
            responseData.message
          );
          if (isError) {
            reject('http request failed' + responseData.message);
          } else {
            response(responseData.message);
          }
        });
    });
  }
  addDebitCredit(body) {
    return new Promise((response, reject) => {
      this.http
        .post(`${this.url}/transaction/add_debitCredit`, body)
        .subscribe((responseData: ResponseType) => {
          let isError = this.checkForErr(
            responseData.status,
            responseData.message
          );
          if (isError) {
            reject('http request failed' + responseData.message);
          } else {
            response(responseData.message);
          }
        });
    });
  }
  getCustomer() {
    return new Promise((response, reject) => {
      this.http
        .get(`${this.url}/customer/getCustomer`)
        .subscribe((responseData: ResponseType) => {
          console.log('mainservice');

          let isError = this.checkForErr(
            responseData.status,
            responseData.message
          );
          if (isError) {
            reject('http request failed' + responseData.message);
          } else {
            response(responseData.message);
          }
        });
    });
  }
  getTransaction(id, idArray) {
    return new Promise((response, reject) => {
      this.http
        .post(`${this.url}/transaction/indiTrans?id=${id}`, idArray)
        .subscribe((responseData: ResponseType) => {
          let isError = this.checkForErr(
            responseData.status,
            responseData.message
          );
          if (isError) {
            reject('http request failed' + responseData.message);
          } else {
            response(responseData.message);
          }
        });
    });
  }
  checkForErr(statusCode, message) {
    // if (statusCode != 200) {
    //   this.dialog.open(ErrMsgModuleComponent, { data: message });
    //   return true;
    // } else {
    //   return false;
    // }
    return false;
  }
}
