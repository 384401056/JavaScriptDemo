import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-pricequote',
  templateUrl: './pricequote.component.html',
  styleUrls: ['./pricequote.component.css']
})
export class PricequoteComponent implements OnInit {

  private priceQ:PriceQuote = new PriceQuote("", 0);

  //定义一个事件发射器，用于把priceQuote类型的数据向组件外发射。
  //priceChange为事件名,如果没有指定则，事件名为：emitter
  @Output("priceChange")
  private emitter:EventEmitter<PriceQuote> = new EventEmitter();

  constructor() { }

  ngOnInit() {
    setInterval(()=>{
      this.priceQ = new PriceQuote("MicroSoft", Math.random()*200);
    }, 1000);
  }

  sendValue($event){
    //发射事件
    this.emitter.emit(this.priceQ);
  }
}

export class PriceQuote{
  constructor(
    public stockCode:string,
    public lastPrice:number
  ){}
}