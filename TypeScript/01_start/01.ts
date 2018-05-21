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


/**数组*/
let list = [];
list.push('gaoyanbin');
list.push('lily');
console.log(list);

let list2: string[] = ['1', '2', '3'];
list2.push('4')
console.log(list2);

let list3: Array<Number> = [1, 2, 3, 4, 5, 6, 7, 8, 9];
list3.push(10)
console.log(list3)


/**枚举 */
enum Color { Red = 1, Green, Orange }; //自动给Green赋值为2.
let color: Color;
color = Color.Green;
console.log(color)  //打印出2

let colorName: string = Color[3];
console.log(colorName)  //打印出Orange


/**元组 Tuple */
let tup: [string, number];

tup = ['gaoyanbin', 100];
console.log(tup);





/**解构数组 */
let input = [1, 2];
let [first, second] = input;


let [one, ...rest] = [4, 5, 6, 7]; //可以在数组里使用...语法创建剩余变量

/**展开数组 */
let md1 = [1, 2];
let md2 = [3, 4];
let bothPlus = [0, ...md1, ...md2, 5];

console.log(bothPlus); // outputs [0, 1, 2, 3, 4, 5]


/*函数 */

function add(x: number, y: number): number {
    return x + y;
}
console.log(add(10, 20));

let myfunc = function (x: number, y: number): number {
    return x + y;
}
console.log(myfunc(100, 200));

/*箭头函数 */
let myfunc2 = (x: number, y: number):number=> {
    return x + y;
}

console.log(myfunc2(200, 200));


/*指定函数的可选参数 */
let myfunc3 = function (x?: string, y?: string): string {
    return x + ' ' + y
}
console.log(myfunc3()) //打印 undefined undefined
console.log(myfunc3("gao")) //打印 gao undefined
console.log(myfunc3("gao", "yanbin"))

/*指定函数的默认参数 */
let myfunc4 = function (x: string, y: string = "kkkk.com"): string {
    return x + ' ' + y
}
console.log(myfunc4("gao"))
console.log(myfunc4("gao", "yanbin"))

/*指定函数的可变参数 */
let myfunc5 = function (x: string, ...y: string[]): string {
    return x + ' ' + y.join(' ') //让y中的元素以空格相连
}
console.log(myfunc5("ABC")) //只会打印 ABC ,y不会打印出undefined
console.log(myfunc5("ABC","1","2","3","4"))


/*
函数的重载 
在TypeScript中需要先写一些同名的函数声明，然后在一个同名函数里写出实现，而且需要自己判断参数类型 
*/
function attr(name:string):string;
function attr(age:number):number;

function attr(nameorage:any):any{
    if (nameorage && typeof nameorage === 'string') {
        return "string"
    }else{
        return "number"
    }
}

console.log(attr("gaoyanbin"));
console.log(attr(123));