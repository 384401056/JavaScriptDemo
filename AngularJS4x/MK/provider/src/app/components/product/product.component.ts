import { Component, OnInit } from '@angular/core';
import { ProductService, Product } from '../../services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  private product:Product;

  constructor(private service:ProductService) { }

  ngOnInit() {
    this.product = this.service.getProduct();
  }
}
