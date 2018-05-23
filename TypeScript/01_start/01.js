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
/**数组*/
var list = [];
list.push('gaoyanbin');
list.push('lily');
console.log(list);
var list2 = ['1', '2', '3'];
list2.push('4');
console.log(list2);
var list3 = [1, 2, 3, 4, 5, 6, 7, 8, 9];
list3.push(10);
console.log(list3);
/**枚举 */
var Color;
(function (Color) {
    Color[Color["Red"] = 1] = "Red";
    Color[Color["Green"] = 2] = "Green";
    Color[Color["Orange"] = 3] = "Orange";
})(Color || (Color = {}));
; //自动给Green赋值为2.
var color;
color = Color.Green;
console.log(color); //打印出2
var colorName = Color[3];
console.log(colorName); //打印出Orange
/**元组 Tuple */
var tup;
tup = ['gaoyanbin', 100];
console.log(tup);
/**解构数组 */
var input = [1, 2];
var first = input[0], second = input[1];
var _a = [4, 5, 6, 7], one = _a[0], rest = _a.slice(1); //可以在数组里使用...语法创建剩余变量
/**展开数组 */
var md1 = [1, 2];
var md2 = [3, 4];
var bothPlus = [0].concat(md1, md2, [5]);
console.log(bothPlus); // outputs [0, 1, 2, 3, 4, 5]
/*函数 */
function add(x, y) {
    return x + y;
}
console.log(add(10, 20));
var myfunc = function (x, y) {
    return x + y;
};
console.log(myfunc(100, 200));
/*箭头函数 */
var myfunc2 = function (x, y) {
    return x + y;
};
console.log(myfunc2(200, 200));
/*指定函数的可选参数 */
var myfunc3 = function (x, y) {
    return x + ' ' + y;
};
console.log(myfunc3()); //打印 undefined undefined
console.log(myfunc3("gao")); //打印 gao undefined
console.log(myfunc3("gao", "yanbin"));
/*指定函数的默认参数 */
var myfunc4 = function (x, y) {
    if (y === void 0) { y = "kkkk.com"; }
    return x + ' ' + y;
};
console.log(myfunc4("gao"));
console.log(myfunc4("gao", "yanbin"));
/*指定函数的可变参数 */
var myfunc5 = function (x) {
    var y = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        y[_i - 1] = arguments[_i];
    }
    return x + ' ' + y.join(' '); //让y中的元素以空格相连
};
console.log(myfunc5("ABC")); //只会打印 ABC ,y不会打印出undefined
console.log(myfunc5("ABC", "1", "2", "3", "4"));
function attr(nameorage) {
    if (nameorage && typeof nameorage === 'string') {
        return "string";
    }
    else {
        return "number";
    }
}
console.log(attr("gaoyanbin"));
console.log(attr(123));
