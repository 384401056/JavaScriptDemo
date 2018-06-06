import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  private ws:WebSocket;

  constructor() { }

  createObservableSocket(url:string):Observable<any>{
    this.ws = new WebSocket(url);
    // return new Observable()
    return null;
  }

} 
