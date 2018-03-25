function greeter(str: string) {
    return str;
}

/**数据类型 */

//字符型
let user: string = "Gaoyanbin";
let content1: string = `Hello, you name is ${user}.`; //模版字符串
let content2: string = "hello, you name is " + user;


/**布尔值 */
let bool: boolean = true;


/**数值 */
let decLiteral: number = 6;
let hexLiteral: number = 0xf00d; //十六进制
let binaryLiteral: number = 0b1010; //二进制
let octalLiteral: number = 0o744; //八进制


/**数组 */
let list = [];

list.push('gaoyanbin');
list.push('lily');


/**元组 Tuple */
let tup: [string, number];

tup = ['gaoyanbin', 100];

/**枚举 */
enum Color { Red = 1, Green = 2, Orange = 3 };

let color:Color;
color = Color.Green;

let colorName: string = Color[3];

/**解构数组 */
let input = [1, 2];
let [first, second] = input;


let [one, ...rest] = [4, 5, 6, 7]; //可以在数组里使用...语法创建剩余变量

/**展开数组 */
let md1 = [1, 2];
let md2 = [3, 4];
let bothPlus = [0, ...md1, ...md2, 5];

console.log(bothPlus); // outputs [0, 1, 2, 3, 4, 5]




