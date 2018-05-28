import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'multiple'
})
export class MultiplePipe implements PipeTransform {

  /**
   * 对差值表达式中的数，乘以一个系数.
   * @param value 差值表达式中的值。
   * @param args 参数(可选)
   */
  transform(value: number, args?: number): number {
    if (!args){
      args = 1;
    }
    return value*args;
  }

}
