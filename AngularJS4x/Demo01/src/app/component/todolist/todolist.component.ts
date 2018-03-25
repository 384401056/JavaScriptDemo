import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css']
})
export class TodolistComponent implements OnInit {

  private todoList = []; /**写成 todoList: any[] 不行 */
  private inputValue: string;

  constructor() { }

  ngOnInit() {
  }

  addData(e) {
    if (e.key === 'Enter') {
      this.todoList.push({
        'title': this.inputValue,
        'status': 1,
      });
      this.inputValue = '';
    }
  }

  complete(index) {
    this.todoList[index].status = 0;
    // this.todoList.splice(index, 1); /**删除list中的数据 */
  }

  reset(index) {
    this.todoList[index].status = 1;
  }
}
