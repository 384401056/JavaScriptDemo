import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-eventcomp',
  templateUrl: './eventcomp.component.html',
  styleUrls: ['./eventcomp.component.css']
})
export class EventcompComponent implements OnInit {

  private msg: String = '....';
  private isShow: Boolean = true;
  private input_str: String = '';
  private inputValue: String = 'aaa';
  constructor() { }

  ngOnInit() {
  }

  getData() {
    this.msg = this.msg + '获取数据...';
  }

  showRect() {
    this.isShow = !this.isShow;
    console.log(this.isShow);
  }

  keyupFn(e) {
    // console.log(e);
    console.log('你按下了' + e.key + '键！按键编号为' + e.keyCode);
  }

}
