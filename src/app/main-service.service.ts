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
  // 'https://adj-backend.herokuapp.com'
  // 'http://localhost:3000'
  url = 'http://localhost:3000';
  accountType = new Subject<string>();
  indexAll = 1;
  mainBal = 0;
  allTobj = {
    DEBIT: 0,
    CREDIT: 0,
    ISSUE: 0,
    RETURN: 0,
  };
  allTTotalObj = {
    DEBIT: 0,
    CREDIT: 0,
    ISSUE: 0,
    RETURN: 0,
  };
  constructor(private http: HttpClient) {
    openSocket(this.url);
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
  getCustomer(page) {
    return new Promise((response, reject) => {
      this.http
        .get(`${this.url}/customer/getCustomer?page=${page}`)
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
    let d = new Date().getTime();
    return new Promise((response, reject) => {
      this.http
        .post(`${this.url}/transaction/indiTrans`, idArray)
        .pipe(
          map((resData: ResponseType) => {
            for (let i = 0; i < resData.message.length; i++) {
              //
              if (resData.message[i].returnDate != undefined) {
                let replaceTwo = new Date(resData.message[i].returnDate);
                resData.message[i].returnDate = `${replaceTwo.getDate()} / ${
                  Number(replaceTwo.getMonth()) + 1
                } / ${replaceTwo.getFullYear()}`;
              } else {
                resData.message[i].amtToPay = Math.round(
                  (resData.message[i].principle *
                    resData.message[i].roi *
                    (d - resData.message[i].issueDate)) /
                    (86400000 * 30)
                );
                console.log(
                  resData.message[i].issueDate,
                  typeof resData.message[i].issueDate
                );
              }
              //
              let replace = new Date(resData.message[i].issueDate);
              resData.message[i].issueDate = `${replace.getDate()} / ${
                Number(replace.getMonth()) + 1
              } / ${replace.getFullYear()}`;
              //
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
  getDC(from, till, page) {
    return new Promise((response, reject) => {
      this.http
        .get(
          `${this.url}/transaction/getDC?from=${from}&till=${till}&page=${page}`
        )
        .pipe(
          map((resData: ResponseType) => {
            resData.message.forEach((element) => {
              let date = new Date(element.date);
              element.date = `${date.getDate()}/${
                date.getMonth() + 1
              }/${date.getFullYear()}`;
            });
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
  getIRTransaction(from, till, page) {
    return new Promise((response, reject) => {
      this.http
        .get(
          `${this.url}/transaction/get_RandI_Transaction?from=${from}&till=${till}&page=${page}`
        )
        .pipe(
          map((resData: ResponseType) => {
            resData.message[0].forEach((element) => {
              let date = new Date(element.issueDate);
              element.issueDate = `${date.getDate()}/${
                date.getMonth() + 1
              }/${date.getFullYear()}`;
              if (element.returnDate != undefined) {
                let replaceTwo = new Date(element.returnDate);
                element.returnDate = `${replaceTwo.getDate()} / ${
                  Number(replaceTwo.getMonth()) + 1
                } / ${replaceTwo.getFullYear()}`;
              }
            });
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

  getRT(from, till, page) {
    return new Promise((response, reject) => {
      this.http
        .get(
          `${this.url}/transaction/getRT?from=${from}&till=${till}&page=${page}`
        )
        .pipe(
          map((resData: ResponseType) => {
            resData.message[0].forEach((element) => {
              let date = new Date(element.returnDate);
              element.returnDate = `${date.getDate()}/${
                date.getMonth() + 1
              }/${date.getFullYear()}`;
            });
            return resData;
          })
        )
        .subscribe((responseData: ResponseType) => {
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

  getAllT(from, till, page) {
    return new Promise((response, reject) => {
      this.http
        .get(
          `${this.url}/transaction/allT?from=${from}&till=${till}&page=${page}`
        )
        .pipe(
          map((resData: ResponseType) => {
            // for (let i = 0; i < resData.message.length; i++) {
            resData.message.forEach((element) => {
              if (element.mainBal == undefined) {
                element.index = this.indexAll;
                this.allTobj[element.type] += element.amount;
                if (element.type == 'DEBIT' || 'ISSUE') {
                  element.main_bal = this.mainBal - element.amount;
                  this.mainBal = this.mainBal - element.amount;
                } else {
                  element.main_bal = this.mainBal + element.amount;
                }
                this.indexAll++;
              } else {
                let replace = new Date(element.date);
                // console.log(replace);
                element.date = `${replace.getDate()} / ${
                  Number(replace.getMonth()) + 1
                } / ${replace.getFullYear()}`;
                // console.log(element.date);
                this.indexAll = 1;
                this.mainBal = element.mainBal;
                element = { ...element, ...this.allTobj };
                (this.allTTotalObj.DEBIT += this.allTobj.DEBIT),
                  (this.allTTotalObj.CREDIT += this.allTobj.CREDIT),
                  (this.allTTotalObj.ISSUE += this.allTobj.ISSUE),
                  (this.allTTotalObj.RETURN += this.allTobj.RETURN),
                  (this.allTobj = {
                    DEBIT: 0,
                    CREDIT: 0,
                    ISSUE: 0,
                    RETURN: 0,
                  });
              }
            });

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
            response({
              forTable: responseData.message,
              forTotal: this.allTTotalObj,
            });
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
        .get(
          `${
            this.url
          }/customer/autocomplete?keyword=${value}&limit=${20}&field=${field}`
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
}
