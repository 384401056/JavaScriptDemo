import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';

@Component({
  selector: 'app-reactiv-form',
  templateUrl: './reactiv-form.component.html',
  styleUrls: ['./reactiv-form.component.css']
})
export class ReactivFormComponent implements OnInit {

  //定义一个响应式表单的数据模型。
  formGroup: FormGroup = new FormGroup({
    //定义一个formControl组.
    dateRange: new FormGroup({
      from: new FormControl(), //定义具体的formControl
      to: new FormControl()
    }),
    //定义一个FormArray
    emails: new FormArray([
      new FormControl(),
      new FormControl()
    ])
  });

  constructor() { }

  ngOnInit() {
  }

  onSubmit() {
    console.log(this.formGroup.value);
  }
  addEmail(event){
    //获取formGroup中的emails。
    let emails = this.formGroup.get('emails') as FormArray;
    if (emails.length < 3){
      emails.push(new FormControl());
    }
  }
}
