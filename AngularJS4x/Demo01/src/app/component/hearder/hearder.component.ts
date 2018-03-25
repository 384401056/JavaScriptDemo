import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hearder',
  templateUrl: './hearder.component.html',
  styleUrls: ['./hearder.component.css']
})

export class HearderComponent implements OnInit {
  private title: string;
  private list1 = [];
  private list2 = [];
  private id: Number;
  private tip: string;
  private h: string;
  constructor() {
    this.title = '这是一个数据绑定';

    for (let i = 0; i < 10; i++) {
      this.list1.push({ 'name': 'Lily' + i, 'age': 20 + i });
    }

    this.id = 8009332;
    this.tip = '这是一个鼠标提示';
    this.h = '<h4 style="color:aqua">这是一个html内容</h4>';

    this.list2 = [
      {
        'carname': '宝马',
        'list': [
          {'title': '宝马X1'},
          {'title': '宝马X2'},
          {'title': '宝马X3'},
          {'title': '宝马X4'},
        ]
      }
      ,
      {
        'carname': '奥迪',
        'list': [
          {'title': '奥迪Q1'},
          {'title': '奥迪Q2'},
          {'title': '奥迪Q3'},
          {'title': '奥迪Q4'},
        ]
      }
    ];
  }

  ngOnInit() {

  }
}
