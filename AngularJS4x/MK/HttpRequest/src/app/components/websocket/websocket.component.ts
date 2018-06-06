import { Component, OnInit } from '@angular/core';
import { WebsocketService } from '../../services/websocket.service';

@Component({
  selector: 'app-websocket',
  templateUrl: './websocket.component.html',
  styleUrls: ['./websocket.component.css']
})
export class WebsocketComponent implements OnInit {

  private message:string;
  private responseMsg:string;
  constructor(private wsServer:WebsocketService) { }

  ngOnInit() {
    this.wsServer.createObservableSocket('ws://127.0.0.1:5555/chat')
    .subscribe(
      //接收到数据的执行的方法。
      (data)=>{
        console.log(data);
        this.responseMsg = data;
      },
      //发生错误的执行的方法。
      (err) => {
        console.log(err);
        this.responseMsg = err;
      },
      //断开服务器时执行的方法。
      ()=> {
        console.log("流已经结束.");
        this.responseMsg = "流已经结束.";
      }
    );
  }

  sendMessageToServer(){
    this.wsServer.sendMessage(this.message);
    this.message = '';
  }

}
