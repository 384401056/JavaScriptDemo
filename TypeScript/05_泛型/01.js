/**泛型 Genarics */
function Hello(arg) {
    return arg;
}
//在执行函数时，才用指定相关的类型。
var output = Hello("Jims lily");
console.log(output);
/**
 * 我们给MyFunc添加了类型变量T。
 * T帮助我们捕获用户传入的类型（比如：arg），
 * 之后我们就可以使用这个类型。
 * 现在我们可以知道参数类型与返回值类型是相同的了
 */
function MyFunc(arg) {
    return arg;
}
// alert(MyFunc("aaaaaaa"));
var myHello = MyFunc;
alert(myHello("MyHello...."));
/**
 * 泛型类
 */
var MyClass = /** @class */ (function () {
    function MyClass() {
    }
    return MyClass;
}());
var myclass = new MyClass();
myclass.ten = "Hello";
myclass.add = function (x, y) {
    return y;
};
alert(myclass.ten);
alert(myclass.add("world", 20000));
