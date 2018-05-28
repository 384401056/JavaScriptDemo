class Person{
    static age:number
    constructor(age:number){
        Person.age = age;
    }

    tall(){
        return alert(Person.age)
    }
}

let p1 = new Person(10000);
p1.tall();
