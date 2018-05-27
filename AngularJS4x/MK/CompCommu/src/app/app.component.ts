import { Component } from '@angular/core';
import { PriceQuote } from './components/pricequote/pricequote.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  private stockCode:string; //股票代码
  private amount:number; //数量

  private priceQ:PriceQuote = new PriceQuote(" ",0);

  constructor(){}

  ngOnInit() {
    
  }

  sendValue(event){
    this.stockCode = "IBM";
    this.amount = 200*Math.random();
  }

  /**
   * 
   * @param event 事件类型，就是子组件定义发射器时的类型
   */
  getChangePrice(event:PriceQuote){
    this.priceQ = event;
  }

}

