/**接口 */
interface Person {
    firstName: string;
    lastName: string;
}

function greeter(person: Person) {
    return "Hello, " + person.firstName + " " + person.lastName;
}

let userName = { firstName: "Gao", lastName: "Yanbin", age: 200 }; //只有有附合interface的值就可以，多的不会有问题。

// document.body.innerHTML = greeter(userName);

/**接口可选属性 */
interface A {
    a1: string;
    a2?: number;//可以有也可以没有。
}

let aa = { a1: 'kkkk' };

function printText(text: A) {
    console.log(text.a1)
    console.log(text.a2)
}

// printText(aa)


/**接口只读属性 */
interface Point {
    readonly x: number; //只读属性，只能在第一次初始化时赋值。
    readonly y: number;
}
let p: Point = { x: 100, y: 200 };

// p.x = 200; //报错







