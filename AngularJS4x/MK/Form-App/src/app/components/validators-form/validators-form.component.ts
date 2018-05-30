import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { validator_mobile, validator_email, validator_password, validator_identity_async } from '../utils/validators';


@Component({
  selector: 'app-validators-form',
  templateUrl: './validators-form.component.html',
  styleUrls: ['./validators-form.component.css']
})
export class ValidatorsFormComponent implements OnInit {

  private formModel: FormGroup;

  constructor(fb: FormBuilder) {

    //表单数据模型
    this.formModel = fb.group({
      //对username添加了Angular默认的几个校验器。
      username: ['',[Validators.required, Validators.minLength(6)]],
      phone: ['', validator_mobile],//加自定义手机号码校验。
      identity:['',Validators.required, validator_identity_async],//第三个参数加异步校验。
      dateRange: fb.group({
        from: [''],
        to: [''],
      }), 

      pwd: fb.group({
        password: ['',Validators.required], //加了一个formControl的校验.
        pwdconfirm: ['',]
      },{validator:validator_password}),//为FromGroup加自定义密码校验。

      emails: fb.array([
        [''],
        ['']
      ],validator_email) //为FromArray加自定义邮件校验。
    });
  }

  ngOnInit() {
  }

  /**
   * 添加邮件地址.
   * @param event 
   */
  addEmail(event) {
    let emails = this.formModel.get('emails') as FormArray;
    if (emails.length < 3) {
      emails.push(new FormControl());
    }
  }

  onSubmit(){
    //获取username上的校验情况。
    // let isValid:boolean = this.formModel.get("username").valid;
    // let error:any = this.formModel.get("username").errors;
    // console.log(isValid);
    // console.log("username的错误信息是："+ JSON.stringify(error));

    // let isValid:boolean = this.formModel.get("phone").valid;
    // let error:any = this.formModel.get("phone").errors;
    // console.log(isValid);

    console.log("username的错误信息是："+ JSON.stringify(this.formModel.get("username").errors));
    console.log("phone的错误信息是："+ JSON.stringify(this.formModel.get("phone").errors));
    console.log("password的错误信息是："+ JSON.stringify(this.formModel.get("pwd").get("password").errors));
    console.log("pwdconfirm的错误信息是："+ JSON.stringify(this.formModel.get("pwd").get("pwdconfirm").errors));
    console.log("pwd的错误信息是："+ JSON.stringify(this.formModel.get("pwd").errors));
    console.log("identity的错误信息是："+ JSON.stringify(this.formModel.get("identity").errors));
    console.log("emails的错误信息是："+ JSON.stringify(this.formModel.get("emails").errors));
    console.log("表单的校验信息是："+ this.formModel.valid);
    console.log(this.formModel.value);

  }

}
