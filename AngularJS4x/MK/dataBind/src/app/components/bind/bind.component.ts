import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import "rxjs/Rx";

@Component({
  selector: 'app-bind',
  templateUrl: './bind.component.html',
  styleUrls: ['./bind.component.css']
})

export class BindComponent implements OnInit {

  //FormControl是 ReactiveFormsModule 响应式编程模块中提供的。
  searchInput:FormControl = new FormControl();

  constructor() { 
  }

  ngOnInit() {
    this.searchInput
    .valueChanges //当值改变时，发射一个事件流
    .debounceTime(500) //如果值的改变间隔小于500毫秒就不发射了。
    .subscribe(inpuInfo => this.getInputInfo(inpuInfo)); //订阅事件，执行指定的方法，并传入input中的value
  }

  //此方法订阅了一个被观察者。
  getInputInfo(info){
    console.log(info);
  }

}
