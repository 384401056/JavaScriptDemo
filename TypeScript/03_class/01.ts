
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