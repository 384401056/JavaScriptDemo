import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService, Product, Comment } from '../services/product.service';

@Component({
  selector: 'app-productdetail',
  templateUrl: './productdetail.component.html',
  styleUrls: ['./productdetail.component.css']
})
export class ProductdetailComponent implements OnInit {

  private imgURL:string = "http://placehold.it/820x230"; //缩略图地址
  private productId:number;//商品
  private comments:Comment[];//评论
  private product:Product;

  constructor(private routerInfo:ActivatedRoute,private providerService:ProductService) { }

  ngOnInit() {
    this.productId = this.routerInfo.snapshot.params["productId"];
    console.log(this.productId);
    this.product = this.providerService.getProductById(this.productId);
    this.comments = this.providerService.getCommentsByProId(this.productId);
    console.log(this.product);
    console.log(this.comments.length);
  }

}
