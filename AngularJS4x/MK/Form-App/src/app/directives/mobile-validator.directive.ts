import { Directive } from '@angular/core';
import { NG_VALIDATORS } from '@angular/forms';
import { validator_mobile } from '../components/utils/validators';

@Directive({
  selector: '[appMobile]', //指令的selector是带[]的，说明指令在html中是当作属性来用的。
  //将validator_mobile校验器包装到这个指令中。这个校验器就可以在模板表单中使用了。
  //NG_VALIDATORS 是一个token, useValue指定了包装的校验器.multi为true表示：一个token下可以挂多个值。
  providers:[{provide:NG_VALIDATORS, useValue:validator_mobile, multi:true}]
})
export class MobileValidatorDirective {

  constructor() { }
}
