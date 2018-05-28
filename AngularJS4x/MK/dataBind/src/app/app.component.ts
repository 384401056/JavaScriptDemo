import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private imgUrl = "http://placehold.it/150x100"
  private size = 2;
  private myclass: string;
  private isOn = false;
  private myNgClass:any;
  private isDev = false;
  private myNgStyle:any;
  private name = "China"
  private ngName = "China"

  private birth:Date = new Date();
  private pi:number = 3.1415926;
  // private pi:number = 3;
  private num:number = 250;

  constructor() {
    setTimeout(() => {
      this.myclass = "btn";
      this.isDev = true;
      setTimeout(()=>{
        this.isOn = true;
        this.isDev = false;

      },3000)
    }, 3000);

    //每三秒执行一次。
    setInterval(()=>{
      this.name = "China";
      this.ngName = "China";
    },3000);


    this.myNgClass = {"btn":true, "btn-danger":true};
    this.myNgStyle = {"font-size.em":3,"color":"red"};
  }

  btn_click(event: any) {
    console.log("按钮被点击了。" + Math.random() * 100)
    console.log(event);
  }

  inp_input(event: any) {
    console.log("DOM属性：");
    console.log(event.target.value)

    console.log("HTML属性:")
    console.log(event.target.getAttribute('value'))
  }

  onInput(event:any){
    this.name = event.target.value;
  }



}
