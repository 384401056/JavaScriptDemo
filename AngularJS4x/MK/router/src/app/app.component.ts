import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  //从构造函数中取得router对象
  constructor(private router:Router){
  }

  toProduct(){
    /**
     * 当我们点击了 商品详情 连接后，再点击按钮。或者反过来。此时数据不会发生改变。
     * 是由于我们在product中，接收函数用的是参数快照(snapshot)模式。并且由于Info组件
     * 在 ngOnInit 中接收参数，此方法只会在 Info组件创建时执行一次。所以造成了这样的结果，
     * 要想参数接收每次都是新传入，要在 Info 组件中使用 参数订阅(subscribe)模式
     *
     */
    this.router.navigate(['/productInfo',2,'Jims',30]);
  }

}
