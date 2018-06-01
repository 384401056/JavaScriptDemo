import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-star',
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.css']
})
export class StarComponent implements OnInit {

  @Input()
  private rating: number = 0; //输入属性。
  private stars: boolean[];
  @Input()
  private readonly: boolean = false;

  constructor() { }

  ngOnInit() {
    this.stars = [];
    for (let i = 1; i <= 5; i++) {
      this.stars.push(this.rating < i);
    }
  }

  /**
   * 星级组件的点击事件
   * @param event 
   * @param index 点击了哪颗星。
   */
  clickStar(event, index) {
    if (!this.readonly) {
      //index是从0开始的，所以这里要加1
      this.rating = index + 1;
      this.ngOnInit();//根据新的rating值来生成star
    }
  }
}
