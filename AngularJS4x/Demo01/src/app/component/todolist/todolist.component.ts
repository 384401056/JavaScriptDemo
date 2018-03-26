import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css']
})
export class TodolistComponent implements OnInit {

  private todoList = []; /**写成 todoList: any[] 不行 */
  private inputValue: string;

  /**在构造函数中注入,service */
  constructor(private storage: StorageService) {
    console.log(this.storage);
  }

  ngOnInit() {
    let list = this.storage.getItem('todoList');
    if (list) {
      this.todoList = list;
    }
  }

  addData(e) {
    if (e.key === 'Enter') {
      let obj = {
        'title': this.inputValue,
        'status': 1,
      };

      let list = this.storage.getItem('todoList');
      if (list) {
        list.push(obj);
        this.storage.setItem('todoList', list);
      } else {
        let tempArry = [];
        tempArry.push(obj);
        this.storage.setItem('todoList', tempArry);
      }

      this.todoList.push(obj);
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
