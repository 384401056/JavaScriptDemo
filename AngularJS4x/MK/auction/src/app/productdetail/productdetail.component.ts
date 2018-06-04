import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService, Product, Comment } from '../services/product.service';
import { getFormatDate } from '../utils/dateformat';

@Component({
  selector: 'app-productdetail',
  templateUrl: './productdetail.component.html',
  styleUrls: ['./productdetail.component.css']
})
export class ProductdetailComponent implements OnInit {

  private imgURL: string = "http://placehold.it/820x230"; //缩略图地址
  private product: Product;//商品
  private comments: Comment[];//评论
  private productId: number;//商品ID

  private isCommentHidden: boolean = true;
  private newRating: number = 5;//默认的评价数
  private newComment: string = '';//默认的评论内容

  constructor(private routerInfo: ActivatedRoute, private providerService: ProductService) { }

  ngOnInit() {
    this.productId = this.routerInfo.snapshot.params["productId"];
    console.log(this.productId);
    this.product = this.providerService.getProductById(this.productId);
    this.comments = this.providerService.getCommentsByProId(this.productId);
    console.log(this.product);
    console.log(this.comments.length);
  }

  /**
   * 添加评论
   * @param event
   */
  addComment(event) {
    if (this.newComment) {
      let num: number = this.comments.length + 1;//生成评讨id。
      let dateTime: string = getFormatDate(new Date(), undefined);//生成评论时间。
      let myComment: Comment = new Comment(num, this.product.id, dateTime, "李小龙", this.newRating, this.newComment);
      this.comments.unshift(myComment);
      this.newComment = ''; //清空评论栏
      this.newRating = 5; //恢复默认5星。
      this.isCommentHidden = true;//隐藏评论
      this.product.rating = this.sumRating();
    }
  }

  /**
   * 计算平均星值，
   */
  sumRating():number{
      /**
       * reduce的方法解读：共传入两个参数
       * 1. 循环将comments中的单个元素的rating加入sum中。
       * 2. 0，表示sum的初始值。
       */
      let sum:number = this.comments.reduce((sum,comment)=>sum+=comment.rating,0);
      //Math.round 四舍五入取整。也可以在 html 中用管道来处理。
      // this.product.rating = Math.round(sum/this.comments.length);//计算平均值。
      console.log("sum: "+sum);
      console.log("sum/this.comments.length: "+ sum/this.comments.length);
      console.log("this.product.rating: "+this.product.rating);
      return Math.round(sum/this.comments.length);//计算平均值。;
  }

  /**
   * 星级评价组件rating发生变化时处理事件.
   * 注意：其实当星级组件中的@Input和@Output属性的名字符合如下要求时：
   * @Input()
   * xxxx
   * @Output()
   * xxxxChange
   * 就可以在星级组件上对xxxx属性，直接进行 [(xxxx)] 双向绑定。即相当于输入时就输出.
   * 不用再单独修理发射事件。
   * @param event 发射过来的数据
   */
  ratingChange(event: number) {
    this.newRating = event;
    console.log(event);
  }

}
