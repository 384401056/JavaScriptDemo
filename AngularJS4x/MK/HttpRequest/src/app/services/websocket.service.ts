import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/Rx';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  private ws:WebSocket;

  constructor() { }

  /**
   * 创建一个可观测的Observable流.
   * @param url 
   */
  createObservableSocket(url:string):Observable<any>{
    //连接到websocket服务器。
    this.ws = new WebSocket(url);
    //定义返回的流
    return new Observable(
      /**
       * 这里要定义三件事。
       * 1. 什么时候发射下一个元素。
       * 2. 什么时候抛一个异常。
       * 3. 什么时候发出流结束的信号。
       */
      observer => {
        //当ws接收到信息时，发射数据。
        this.ws.onmessage = (event) =>{
          observer.next(event.data);
        };
        //当ws出问题时，抛出异常。
        this.ws.onerror = (event) => observer.error(event);
        //当流结束时，发送关闭信号。
        this.ws.onclose = (event) => observer.complete();
      }
    );
  }

  /**
   * 向服务器发送信息。
   * @param msg 
   */
  sendMessage(msg:string){
    this.ws.send(msg);
  }

}
