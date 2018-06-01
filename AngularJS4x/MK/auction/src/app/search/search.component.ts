import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { validator_positivnumber } from '../utils/validators';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  //表单数据模型。
  private formModel:FormGroup;
  private categories:string[];

  constructor(private productService:ProductService){
    let fb = new FormBuilder();
    this.formModel = fb.group({
      title:['',[Validators.required,Validators.minLength(3)]],
      price:[null,validator_positivnumber],
      category:['-1']
    });
  }

  ngOnInit() {
    this.categories = this.productService.getCategories();
  }

  onSubmit(){
    console.log("title的错误信息是："+ JSON.stringify(this.formModel.get("title").errors));
    console.log("price的错误信息是："+ JSON.stringify(this.formModel.get("price").errors));
    console.log(this.formModel.valid);
    console.log(this.formModel.value);
  }

}
