class Person2 {
    name: string;
    age: number;

    constructor(
    ) { }

    tell() {
        return this.name + ":" + this.age;
    }

    get Name():string{
        return this.name;
    }
}

class Student2 extends Person2 {
    school: string;
    tell() {
        return this.name + ":" + this.age + ":" + this.school;
    }
}

let s = new Student2()
s.name = "Jims";
s.age = 200;
s.school = "Hello School..."
console.log(s.tell());