import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {
  /**
   * HTML5 提供了两种在客户端存储数据的新方法：
      localStorage - 没有时间限制的数据存储.
      sessionStorage - 针对一个 session 的数据存储.
   */
  constructor() { }

  /**
   * 保存数据到localStorage中。
   * @param key
   * @param value
   */
  setItem(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value)); // JSON.stringify从一个对象中解析出字符串
  }

  /**
   * 从localStorage中取出数据。
   * @param key
   */
  getItem(key: string) {
    return JSON.parse(localStorage.getItem(key)); // 从一个字符串中解析出JSON对象
  }

  /**
   * 删除item
   * @param key
   */
  removeItem(key: string) {
    localStorage.removeItem(key);
  }

}
