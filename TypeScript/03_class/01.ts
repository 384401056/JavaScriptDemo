
//ts的类
class Student{
    private fullName: string;
    
    //构造方法
    constructor(public firstName, public middleName, public lastName){
        this.fullName = firstName + '=='+middleName+'=='+lastName;
    }
}

function greeter(stu){
    return stu.fullName;
}

let stu = new Student('Gao','Yan', 'Bin');

document.body.innerHTML = greeter(stu);

/** geter seter */

class Person {

    private _name: string;
    private _age: number;

    constructor(name: string, age: number) {
        this._name = name;
        this._age = age;
    }

    get name(): string {
        return this._name;
    }

    set name(n: string) {
        this._name = n;
    }

    get age(): number {
        return this._age;
    }

    set age(a: number) {
        this._age = a;
    }
}

let p1: Person = new Person("gaoyanbin", 200);

console.log(p1.name)
console.log(p1.age)