/**泛型 Genarics */
function Hello<T>(arg:T):T{
    return arg;
}
//在执行函数时，才用指定相关的类型。
let output = Hello<string>("Jims lily");
console.log(output);

/**
 * 我们给MyFunc添加了类型变量T。 
 * T帮助我们捕获用户传入的类型（比如：arg），
 * 之后我们就可以使用这个类型。
 * 现在我们可以知道参数类型与返回值类型是相同的了
 */
function MyFunc<T>(arg:T):T{
    return arg;
}
// alert(MyFunc("aaaaaaa"));

let myHello:<T>(arg:T)=>T=MyFunc;
alert(myHello("MyHello...."));

/**
 * 泛型类
 */
class MyClass<T>{
    ten:T;
    add:(x:T,y:number)=>number; //number指定的是add方法返回的类型。
}

let myclass = new MyClass<string>();
myclass.ten = "Hello";
myclass.add = function(x:string,y:number):number{
    return y;
}

alert(myclass.ten);
alert(myclass.add("world",20000));