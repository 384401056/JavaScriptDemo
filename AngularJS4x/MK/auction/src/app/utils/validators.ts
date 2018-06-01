import { FormControl, FormGroup, FormArray } from "@angular/forms";
import { Observable } from "rxjs/Rx";

/**
 * 数字是否为正的检查.
 * @param control 
 */
export function validator_positivnumber(control: FormControl):any{
    let isValid: boolean;
    if (!control.value){
        return null;
    }
    isValid = (parseInt(control.value)>0);
    return isValid ? null : { psitivNumber: { desc: "数字不能为负." } };
}


/**
 * 电话号码检查。
 * 更新到2018年5月，支持最新的166号段
 * @param control 
 */
export function validator_mobile(control: FormControl): any {
    let regex = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
    let isValid: boolean = regex.test(control.value);
    // console.log("mobile的校验结果是：" + isValid);

    //这里返回的是在submit中this.formModel.get("phone").errors中取的错误信息。
    //返回，并设置页面上展示的错误信息
    return isValid ? null : { mobile: { desc: "电话号码不正确." } };
}

/**
 * 邮箱地址检查
 * @param control 
 */
export function validator_email(formArray: FormArray): any {
    let regex = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
    let isValid: boolean = true;
    //遍历fromArray中的control.进行验证。
    for (let control of formArray.controls) {
        isValid = (regex.test(control.value) && isValid);
    }
    //返回，并设置页面上展示的错误信息
    return isValid ? null : { email: { desc: "邮箱地址不正确." } };
}

/**
 * 密码两次输入检查。
 * @param control
 */
export function validator_password(group: FormGroup): any {
    let isValid: boolean;
    let password: FormControl = group.get('password') as FormControl;
    let pwdconfirm: FormControl = group.get('pwdconfirm') as FormControl;

    /**
     * 当在处理模块表单的检验时，这里不判断的话，会一个未捕获的异常。
     * 因为模块表单中的值和状态的变更是异步的。有可能在password.value时，
     * password此时还是空的。
     */
    if (password !== null && pwdconfirm !== null) { 
        // console.log(password.value);
        // console.log(pwdconfirm.value);
        isValid = (password.value === pwdconfirm.value);
    }
    //返回，并设置页面上展示的错误信息
    return isValid ? null : { notsame: { desc: "两次输入的密码不相同." } };
}

/**
 * 异步校验器,异步校验器加载在一个fromControl时，只能做为第三个参数传入。
 * @param control 
 */
export function validator_identity_async(control: FormControl): any {
    let isValid: boolean;
    isValid = (control.value === '7777777');
    console.log(isValid);
    //使用Observale.of 要导入 rxjs/Rx。
    //如果 formModel.status=='PENDING' 则说明正在异步检验调用中,可根据此值来判断结果是否已经返回。
    //delay(3000)用于模拟异步调用的时间。
    return Observable.of(isValid ? null : { identity: { desc: "身份证信息不正确." } }).delay(3000);
}

/**
 * 日期选择检查
 * @param group 
 */
function validator_date(group: FormGroup): any {
    return null;
}

