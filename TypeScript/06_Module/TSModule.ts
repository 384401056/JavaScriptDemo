/**
 * 
 * Module
 * 1.模块化、可重用。
 * 2.封装变量和函数。
 * TS中的module
 */
module Validation{
    export interface StringValidator{
        isAcceptable(s:string):boolean;
    }

    export class LetterOnlyValidator implements StringValidator {
        isAcceptable(s: string): boolean {
            if (s==="aaa"){
                return true;
            }
            return false;
        }
    }
}

let letter = new Validation.LetterOnlyValidator();
console.log(letter.isAcceptable("bbb"));




