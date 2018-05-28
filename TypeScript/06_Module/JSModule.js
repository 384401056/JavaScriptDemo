
/**
 * 
 * Module
 * 1.模块化、可重用。
 * 2.封装变量和函数。
 * JS中的module
 */
var FunClass = function(){
    var a = 10;
    b =20;
    return{ //返回一个函数对象。
        add:function(){
            console.log("a+b:"+(a+b));
            console.log("b:"+b); //可以访问b的值。
        }
    }
}

// var a = FunClass();
// console.log(a); //此时a一个对象，{add : add(){.....}}
// a.add();

//上面的形式了可以写成如下的样式：
var func = new FunClass();
func.add();