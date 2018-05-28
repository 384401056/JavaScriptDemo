/**接口基本使用,用来规范输入参数的类型 */
interface Person {
    firstName: string;
    lastName: string;
}

function greeter(person: Person) {
    return "Hello, " + person.firstName + " " + person.lastName;
}

let userName = { firstName: "Gao", lastName: "Yanbin", age: 200 }; //只有有符合interface的值就可以，多的不会有问题。

console.log(greeter(userName));
// document.body.innerHTML = greeter(userName);

/**接口可选属性 */
interface A {
    a1: string;
    a2?: number;//可以有也可以没有。
}

let aa = { a1: 'AAAAA', a2: 2342314 };

function printText(text: A) {
    console.log(text.a1)
    console.log(text.a2)
}

printText(aa)


/**接口只读属性 */
interface Point {
    readonly x: number; //只读属性，只能在第一次初始化时赋值。
    readonly y: number;
}
let point: Point = { x: 100, y: 200 };

function readonlyFunc(obj: Point) {
    console.log(obj.x);
    console.log(obj.y);
}

readonlyFunc(point)
// point.x = 200; //报错
// point.y = 200; //报错

/**使用接口来规范函数类型  */
interface SearchFunc {
    //类型为该接口的函数，要符合以下规范，两个string参数，返回值为boolean
    (source: string, subStrng: string): boolean;
}

let myFunc: SearchFunc = (s: string, sub: string): boolean => {
    let result = s.search(sub);
    if (result !== -1) {
        return true;
    } else {
        return false;
    }
}
console.log(myFunc("gaoyaobin", 'k'));

/**使用接口来规范数组类型  */
interface ArrayType{
    [index:number]:string;
}

let array:ArrayType = ["Lily","Jims"];
// let array:ArrayType = ["Lily",10000]; //报错
console.log(array);

/**使用接口来规范Class类型 */
interface ClockInterface{
    currentTime:Date;

    setTime(date:Date);
    getTime();

}

class Clock implements ClockInterface {
    currentTime: Date;
    //实现接口的方法
    setTime(date: Date) {
        this.currentTime = date;
    }
    getTime() {
        return this.currentTime;
    }
}


/**接口的继承。 */
interface Shape{
    color:string;
}

interface PenStroke{
    penWidth:number;
}

//继承多个接口。
interface Square extends Shape, PenStroke{
    sideLenght:number;
}

let s = <Square>{}; //有接口生成对象
s.sideLenght = 20;
s.penWidth = 50;
s.color = "#FFF000"
console.log(s);


// interface Counter{
//     interval:number;
//     reset():void;
//     (strat:number):string;
// }

// let c:Counter;
// console.log(c(10))
// console.log(c.reset());








