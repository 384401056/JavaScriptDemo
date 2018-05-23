import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-productdetail',
  templateUrl: './productdetail.component.html',
  styleUrls: ['./productdetail.component.css']
})
export class ProductdetailComponent implements OnInit {

  private imgURL:string = "http://placehold.it/820x230"; //缩略图地址
  private productTitle:string;

  constructor(private routerInfo:ActivatedRoute) { }

  ngOnInit() {
    this.productTitle = this.routerInfo.snapshot.params["prodTitle"]
  }

}
