import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { Hero } from '../../model/Hero';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})

export class HeroDetailComponent implements OnInit {

  @Input() hero: Hero; // 这是一个从组件外部传入的对象

  constructor() { }

  ngOnInit() {
  }

}
