import { Injectable } from '@angular/core';
import {Http, Response, RequestOptions, Headers } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Module } from '../../module';
import { Stream } from '../../stream';

@Injectable()
export class DataService {

  private buildURL = 'http://10.14.225.87:8080';
  constructor(private http:Http) { }
  getItem(module: String, stream : String):Observable<any>{
    return this.http.get(`${this.buildURL}/${module}/${stream}`).map(
      res => {
        let test = res.text();
        console.log(test);
        return test;
      }
    )
  }
  getStatus():Observable<any>{
    return this.http.get(`${this.buildURL}/getStatus`).map(
      res => {
        let test = res.text();
        console.log(test);
        return test;
      }
    )
  }
  }