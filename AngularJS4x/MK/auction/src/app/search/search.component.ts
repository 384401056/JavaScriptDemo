import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { validator_positivnumber } from '../utils/validators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  //表单数据模型。
  private formModel:FormGroup;

  constructor() { }

  ngOnInit() {
    let fb = new FormBuilder();
    this.formModel = fb.group({
      title:['',Validators.minLength(3)],
      price:[null,validator_positivnumber],
      category:['']
    });
  }

  onSubmit(){

  }

}
