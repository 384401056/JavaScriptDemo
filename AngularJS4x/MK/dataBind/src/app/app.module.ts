import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { BindComponent } from './components/bind/bind.component';

@NgModule({
  declarations: [
    AppComponent,
    BindComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule //响应式编程的模块
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
