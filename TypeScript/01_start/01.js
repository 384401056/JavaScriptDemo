function greeter(str) {
    return str;
}
/**数据类型 */
//字符型
var user = "Gaoyanbin";
var content1 = "Hello, you name is " + user + "."; //模版字符串
var content2 = "hello, you name is " + user;
/**布尔值 */
var bool = true;
/**数值 */
var decLiteral = 6;
var hexLiteral = 0xf00d; //十六进制
var binaryLiteral = 10; //二进制
var octalLiteral = 484; //八进制
/**数组 */
var list = [];
list.push('gaoyanbin');
list.push('lily');
/**元组 Tuple */
var tup;
tup = ['gaoyanbin', 100];
/**枚举 */
var Color;
(function (Color) {
    Color[Color["Red"] = 1] = "Red";
    Color[Color["Green"] = 2] = "Green";
    Color[Color["Orange"] = 3] = "Orange";
})(Color || (Color = {}));
;
var color;
color = Color.Green;
var colorName = Color[3];
/**解构数组 */
var input = [1, 2];
var first = input[0], second = input[1];
var _a = [4, 5, 6, 7], one = _a[0], rest = _a.slice(1); //可以在数组里使用...语法创建剩余变量
console.log(one); // outputs 1
console.log(rest); // outputs [ 2, 3, 4 ]
