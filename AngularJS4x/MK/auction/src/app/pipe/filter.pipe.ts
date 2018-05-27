import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  /**
   * 
   * @param valueList 要过滤的lsit。
   * @param field 根据哪个字段过滤。
   * @param keyword 匹配的关键字。
   */
  transform(valueList: any[], field: string , keyword:string): any {
    //如果字段和关键字为空，则直接返回整个list
    if (!field || !keyword){
      return valueList;
    }

    //从list中筛选出区配的数据。
    return valueList.filter(item=>{
      let filedvalue = item[field];
      return filedvalue.indexOf(keyword) >=0; //如果指定的字段值中，包含keyword，则返回true（list就显示该字段）
    })
  }

}
