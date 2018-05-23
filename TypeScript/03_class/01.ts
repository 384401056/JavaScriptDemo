
//ts的类
class Student {
    public fullName: string;

    //构造方法
    constructor(firstName: string, middleName: string, lastName: string) {
        this.fullName = firstName + '=' + middleName + '=' + lastName;
    }
}

let stu = new Student('Gao', 'Yan', 'Bin');
console.log(stu.fullName)
// document.body.innerHTML = stu.fullName;

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

let p1 = new Person("gaoyanbin", 200);
console.log(p1.name)
console.log(p1.age)