let shap = {
    name:'gaoyanbin',
    popup:function(){
        //此时的this是shap
        console.log('This inside popup:' + this.name);

        // setTimeout(function() {
        //     //此时的this是setTimeout
        //     console.log('This inside setTimeout(): ' + this.name);
        //     console.log("I'm a " + this.name + "!");
        // }, 3000);

        setTimeout(()=>{
            //此时的this是shap,从.js文件中可以看到，它用的是 _this
            console.log('This inside setTimeout(): ' + this.name);
            console.log("I'm a " + this.name + "!");
        }, 3000);
    }
}

shap.popup()