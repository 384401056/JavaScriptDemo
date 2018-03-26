import { Component, OnInit } from '@angular/core';
import { Http, Jsonp } from '@angular/http'; //引入http

@Component({
  selector: 'app-gethttp',
  templateUrl: './gethttp.component.html',
  styleUrls: ['./gethttp.component.css']
})
export class GethttpComponent implements OnInit {

  private inputValue: string;
  private newsList: any[];

  //注入http和jsonp
  constructor(private http: Http, private jsonp: Jsonp) {

    this.inputValue = 'http://www.phonegap100.com/appapi.php?a=getPortalList&catid=20&page=1';

  }

  ngOnInit() {

  }

  getHttpRequest() {
    this.http.get(this.inputValue).subscribe(data => {
      console.log(data['_body']);
      this.newsList = JSON.parse(data['_body']).result;
    }, err => {
      console.log(err);
    });
  }

}
