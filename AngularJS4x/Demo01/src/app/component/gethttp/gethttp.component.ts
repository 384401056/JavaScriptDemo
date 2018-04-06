import { Component, OnInit } from '@angular/core';
import { Http, Jsonp, Headers, RequestOptions, URLSearchParams } from '@angular/http'; //引入http

@Component({
  selector: 'app-gethttp',
  templateUrl: './gethttp.component.html',
  styleUrls: ['./gethttp.component.css']
})
export class GethttpComponent implements OnInit {

  private url1: string;
  private url2: string;
  private newsList1: any[];
  private newsList2: any[];
  private username: string;
  private age: number;

  //注入http和jsonp
  constructor(private http: Http, private jsonp: Jsonp) {
    this.url1 = 'http://www.phonegap100.com/appapi.php?a=getPortalList&catid=20&page=1';
    this.url2 = 'http://www.phonegap100.com/appapi.php?a=getPortalList&catid=20&page=1&callback=JSONP_CALLBACK';
  }

  ngOnInit() {

  }

  getHttpRequest() {
    this.http.get(this.url1).subscribe(data => {
      console.log(data['_body']);
      this.newsList1 = JSON.parse(data['_body']).result;
    }, err => {
      console.log(err);
    });
  }

  getJsonpRequest() {
    this.jsonp.get(this.url2).subscribe(data => {
      console.log(data['_body']);
      this.newsList2 = data['_body'].result; //jsonp请求返回的已经是json对象了。
    }, err => {
      console.log(err);
    });
  }

  postRequest(param1, param2) {
    let name: string = param1;
    let age: number = parseInt(param2, 10);

    //当请求头是这样的，要用URLSearchParams来传递参数。
    let headers: Headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' });
    let params: URLSearchParams = new URLSearchParams();
    params.append('username', JSON.stringify(name));
    params.append('age', JSON.stringify(age));
    
    //当请求头是 application/json时，要用如下的参数。同时服务器端也要做相应的改变。
    // let headers: Headers = new Headers({ 'Content-Type': 'application/json;charset=UTF-8' });
    // let params = {"username":name, "age":age};
    
    let options: RequestOptions = new RequestOptions({ headers: headers });
    this.http.post(
      'http://127.0.0.1:5764/index', params, options).subscribe(data => {
      console.log(data);
    }, err => {
      console.log(err);
    });


  }
}
