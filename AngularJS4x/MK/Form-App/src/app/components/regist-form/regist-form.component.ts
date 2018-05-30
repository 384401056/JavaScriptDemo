import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-regist-form',
  templateUrl: './regist-form.component.html',
  styleUrls: ['./regist-form.component.css']
})
export class RegistFormComponent implements OnInit {

  //表单数据模型。
  private formModel: FormGroup;

  //注入formbuildr
  constructor(fb:FormBuilder) {

    //使用frombuilder对象来创建FromGroup
    this.formModel = fb.group({
      username:[''],//使用frombuilder对象来创建FromControl
      phone: [''],//使用frombuilder对象来创建FromControl
      pwd: fb.group({
        password: [''],
        pwdconfirm: ['']
      })
    });

  }

  ngOnInit() {
  }

  onSubmit(){
    console.log(this.formModel.value);
  }

}
