import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-template-validator-form',
  templateUrl: './template-validator-form.component.html',
  styleUrls: ['./template-validator-form.component.css']
})
export class TemplateValidatorFormComponent implements OnInit {

  private formModel:FormGroup;
  private userNameValid:boolean = true;
  private userNameUntouched:boolean = true;

  constructor() { }

  ngOnInit() {
  }

  onSubmit(form){
    this.formModel = form as FormGroup;
    console.log( this.formModel.value);
    console.log( this.formModel.valid);
  }

  onNameInput(form){
    if (form){
      this.userNameValid = form.form.get("userName").valid;
      this.userNameUntouched = form.form.get("userName").untouched;//这个值好像无法获取到false.
      console.log(this.userNameValid);
      console.log(this.userNameUntouched);
    }
  }
}
