import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  @Input()
  private stockCode:string; //股票代码
  @Input()
  private amount:number; //数量

  constructor() { }

  ngOnInit() {
  }
}
