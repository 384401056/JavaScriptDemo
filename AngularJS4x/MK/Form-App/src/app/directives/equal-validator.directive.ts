import { Directive } from '@angular/core';
import { validator_password } from '../components/utils/validators';
import { NG_VALIDATORS } from '@angular/forms';

@Directive({
  selector: '[appEqual]',
  //将validator_password校验器包装到这个指令中。这个校验器就可以在模板表单中使用了。
  //NG_VALIDATORS 是一个token(唯一标识), useValue指定了包装的校验器. multi为true表示：一个token下可以挂多个值。
  providers:[{provide:NG_VALIDATORS, useValue:validator_password, multi:true}]
})
export class EqualValidatorDirective {

  constructor() { }

}
