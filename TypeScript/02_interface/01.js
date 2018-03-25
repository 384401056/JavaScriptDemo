function greeter(person) {
    return "Hello, " + person.firstName + " " + person.lastName;
}
var userName = { firstName: "Gao", lastName: "Yanbin", age: 200 }; //只有有附合interface的值就可以，多的不会有问题。
var aa = { a1: 'kkkk' };
function printText(text) {
    console.log(text.a1);
    console.log(text.a2);
}
printText(aa);
