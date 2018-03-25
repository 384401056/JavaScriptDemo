class Shape {
 
    public area: number;
    public color: string;
 
    constructor ( name: string, width: number, height: number ) {
        this.area = width * height;
        this.color = "pink";
    };
 
    shoutout() {
        return "I'm " + this.color +" with an area of " + this.area + " cm squared.";
    }
}

class Shape3D extends Shape{
    public volume: number;
 
    constructor (public name: string, width: number, height: number, length: number ) {
        super( name, width, height );//父类的构造方法
        this.volume = length * this.area;
    };
 
    shoutout() {
        return "I'm " + this.name +  " with a volume of " + this.volume + " cm cube." + "color "+this.color + " area:"+ this.area; //父类的属性color
    }
 
    superShout() {
        return super.shoutout();//调父类的方法
    }
}

var cube = new Shape3D("cube", 30, 30, 30);
console.log( cube.shoutout() );
console.log( cube.superShout() );