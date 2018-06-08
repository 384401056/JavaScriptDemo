import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/Rx';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  private ws:WebSocket;

  constructor() { }

  /**
   * 创建websocket连接，返回一个可观测的流。
   * @param url 
   */
  createObservableSocket(url:string, prodId:number, user:string):Observable<any>{
    this.ws = new WebSocket(url);
    return new Observable(
      observer=>{
        this.ws.onmessage=(event)=> observer.next(event.data);//接收到数据的执行方法
        this.ws.onerror=(event)=>observer.error(event); //发生错误的执行方法
        this.ws.onclose=(event)=>observer.complete(); // 关闭连接的执行方法
        // 这在传入 user 数据进行连接的区别
        this.ws.onopen=(event)=>this.sendMessage(JSON.stringify({'prodid':prodId, 'user':user})); //建连接后的执行方法
      }
    );
  }

  sendMessage(msg:any){
    this.ws.send(JSON.stringify(msg));
  }

} 
