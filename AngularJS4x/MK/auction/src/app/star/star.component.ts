import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';

@Component({
  selector: 'app-star',
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.css']
})
export class StarComponent implements OnInit,OnChanges {


  @Input()
  private rating: number = 0; //输入属性。
  private stars: boolean[];
  @Input()
  private readonly: boolean = true;

  /**
   * 事件输出，当rating改变时，发射事件，
   * 让其父组件根据改变做相应的操作。
   */
  @Output()
  private ratingChange:EventEmitter<number> = new EventEmitter();
 

  constructor() { }

  ngOnInit() {
  }

  /**
   * 当输入属性改变时，就会执行此生命周期钩子。
   * 我们可以用来更新星级组件的显示。
   * @param changes
   */
  ngOnChanges(changes: SimpleChanges): void {
    // console.log(changes);//changes中记录着，哪些值改变了。
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

      //如果把更新星级组件显示的代码移到 ngOnChanges 方法中，以下这行代码就不需要了。
      // this.ngOnInit();//根据新的rating值来生成star
      
      //发射事件。
      this.ratingChange.emit(this.rating);
    }

    
  }
}
