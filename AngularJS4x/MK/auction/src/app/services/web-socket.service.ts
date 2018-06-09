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
  createObservableSocket(url:string, prodId:number):Observable<any>{
    this.ws = new WebSocket(url);
    return new Observable(
      observer=>{
        this.ws.onmessage=(event)=> observer.next(event.data);//接收到数据的执行方法
        this.ws.onerror=(event)=>observer.error(event); //发生错误的执行方法
        this.ws.onclose=(event)=>observer.complete(); // 关闭连接的执行方法
        // 用于指定连接成功后的回调函数,这在发送 user 数据进行连接的区别
        this.ws.onopen=(event)=>this.sendMessage({'prodid':prodId}); //建连接后的执行方法

        //返回一个关闭 websocket 的匿名方法。此方法会在subscription.unsubscribe()时执行。
        return ()=>this.ws.close(); 
      }
    );
  }

  sendMessage(msg:any){
    this.ws.send(JSON.stringify(msg));
  }

} 
