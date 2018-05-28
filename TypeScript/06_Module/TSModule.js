/**
 *
 * Module
 * 1.模块化、可重用。
 * 2.封装变量和函数。
 * TS中的module
 */
var Validation;
(function (Validation) {
    var LetterOnlyValidator = /** @class */ (function () {
        function LetterOnlyValidator() {
        }
        LetterOnlyValidator.prototype.isAcceptable = function (s) {
            if (s === "aaa") {
                return true;
            }
            return false;
        };
        return LetterOnlyValidator;
    }());
    Validation.LetterOnlyValidator = LetterOnlyValidator;
})(Validation || (Validation = {}));
var letter = new Validation.LetterOnlyValidator();
console.log(letter.isAcceptable("bbb"));
