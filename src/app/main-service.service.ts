import { Injectable } from '@angular/core';
import openSocket from 'socket.io-client';
import { HttpClient } from '@angular/common/http';
import { ResponseType } from './models/responseType';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MainServiceService {
  url = 'http://localhost:3000';
  accountType = new Subject<string>();

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
  addTransaction(body) {
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
        .post(`${this.url}/transaction/return`, body)
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
        .post(`${this.url}/transaction/indiTrans`, idArray)
        .pipe(
          map((resData: ResponseType) => {
            for (let i = 0; i < resData.message.length; i++) {
              let replace = new Date(resData.message[i].issueDate);
              resData.message[i].issueDate = `${replace.getDate()} / ${
                Number(replace.getMonth()) + 1
              } / ${replace.getFullYear()}`;
              //
              if (resData.message[i].returnDate != undefined) {
                let replaceTwo = new Date(resData.message[i].returnDate);
                resData.message[i].returnDate = `${replaceTwo.getDate()} / ${
                  Number(replaceTwo.getMonth()) + 1
                } / ${replaceTwo.getFullYear()}`;
              }
            }
            return resData;
          })
        )
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
  getDC() {
    return new Promise((response, reject) => {
      this.http
        .get(`${this.url}/transaction/getDC`)
        .pipe(
          map((resData: ResponseType) => {
            for (let i = 0; i < resData.message.length; i++) {
              let replace = new Date(resData.message[i].date);
              resData.message[i].date = `${replace.getDate()} / ${
                Number(replace.getMonth()) + 1
              } / ${replace.getFullYear()}`;
            }
            return resData;
          })
        )
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
  newDC(body) {
    return new Promise((response, reject) => {
      this.http
        .post(`${this.url}/transaction/new_debitCredit`, body)
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
  getIRTransaction(from, till) {
    return new Promise((response, reject) => {
      this.http
        .get(
          `${this.url}/transaction/get_RandI_Transaction?from=${from}&till=${till}`
        )
        .pipe(
          map((resData: ResponseType) => {
            for (let i = 0; i < resData.message[0].length; i++) {
              let replace = new Date(resData.message[0][i].issueDate);
              resData.message[0][i].issueDate = `${replace.getDate()} / ${
                Number(replace.getMonth()) + 1
              } / ${replace.getFullYear()}`;
              //
              if (resData.message[0][i].returnDate != undefined) {
                let replaceTwo = new Date(resData.message[0][i].returnDate);
                resData.message[0][i].returnDate = `${replaceTwo.getDate()} / ${
                  Number(replaceTwo.getMonth()) + 1
                } / ${replaceTwo.getFullYear()}`;
              }
            }
            return resData;
          })
        )
        .subscribe((responseData: ResponseType) => {
          console.log('responseData.message', responseData.message);
          let isError = this.checkForErr(
            responseData.status,
            responseData.message[0]
          );
          if (isError) {
            reject('http request failed' + responseData.message[0]);
          } else {
            response([responseData.message[0], responseData.message[1]]);
          }
        });
    });
  }

  getRT(from, till) {
    return new Promise((response, reject) => {
      this.http
        .get(`${this.url}/transaction/getRT?from=${from}&till=${till}`)
        .pipe(
          map((resData: ResponseType) => {
            for (let i = 0; i < resData.message[0].length; i++) {
              let replace = new Date(resData.message[0][i].returnDate);
              resData.message[0][i].returnDate = `${replace.getDate()} / ${
                Number(replace.getMonth()) + 1
              } / ${replace.getFullYear()}`;

              console.log(resData.message[i]);
            }
            return resData;
          })
        )
        .subscribe((responseData: ResponseType) => {
          console.log('responseData.message', responseData.message);
          let isError = this.checkForErr(
            responseData.status,
            responseData.message[0]
          );
          if (isError) {
            reject('http request failed' + responseData.message[0]);
          } else {
            response([responseData.message[0], responseData.message[1]]);
          }
        });
    });
  }

  getAllT(from, till) {
    return new Promise((response, reject) => {
      this.http
        .get(`${this.url}/transaction/allT?from=${from}&till=${till}`)
        .pipe(
          map((resData: ResponseType) => {
            for (let i = 0; i < resData.message.length; i++) {
              let replace = new Date(resData.message[i].date);
              resData.message[i].date = `${replace.getDate()} / ${
                Number(replace.getMonth()) + 1
              } / ${replace.getFullYear()}`;
            }
            return resData;
          })
        )
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
  checkCredential(userName, password) {
    return new Promise((response, reject) => {
      this.http
        .get(
          `${this.url}/other/checkCredential?userName=${userName}&password=${password}`
        )
        .subscribe((responseData: ResponseType) => {
          this.accountType.next(responseData.title);
          console.log(responseData.title);
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
  getReportsValue() {
    return new Promise((response, reject) => {
      this.http
        .get(`${this.url}/other/getReportsValue`)
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
  autoCompleteName(field, value) {
    return new Promise((response, reject) => {
      this.http
        .get(`${this.url}/autocomplete?keyword=${value}&limit=${20}`)
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
}
