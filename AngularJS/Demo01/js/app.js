/**
 * Created by Administrator on 2016/4/10.
 */

function carController($scope) {
    $scope.items = [
        {title: 'Paint pots', quantity: 8, price: 3.95},
        {title: 'Polka dots', quantity: 17, price: 12.95},
        {title: 'Pebbles', quantity: 5, price: 9.95}
    ];
    $scope.remove = function (index) {
        $scope.items.splice(index, 1);
    }
};


var message = {};
message.someText = "You have started your journey";
function  testController($scope){
    $scope.message = message;
}

