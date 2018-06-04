import { Component, OnInit } from '@angular/core';
import { WebsocketService } from '../../services/websocket.service';

@Component({
  selector: 'app-websocket',
  templateUrl: './websocket.component.html',
  styleUrls: ['./websocket.component.css']
})
export class WebsocketComponent implements OnInit {

  constructor(private wsServer:WebsocketService) { }

  ngOnInit() {
    this.wsServer.createObservableSocket('ws://127.0.0.1:5555')
    .subscribe(
      (data)=>console.log(data),
      (err) => console.log(err),
      ()=> console.log("流已经结束.")
    );
  }

}
