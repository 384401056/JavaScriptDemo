import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { TemplateFormComponent } from './components/template-form/template-form.component';
import { ReactivFormComponent } from './components/reactiv-form/reactiv-form.component';
import { RegistFormComponent } from './components/regist-form/regist-form.component';
import { ValidatorsFormComponent } from './components/validators-form/validators-form.component';
import { MobileValidatorDirective } from './directives/mobile-validator.directive';
import { TemplateValidatorFormComponent } from './components/template-validator-form/template-validator-form.component';
import { EqualValidatorDirective } from './directives/equal-validator.directive';

@NgModule({
  declarations: [
    AppComponent,
    TemplateFormComponent,
    ReactivFormComponent,
    RegistFormComponent,
    ValidatorsFormComponent,
    MobileValidatorDirective,
    TemplateValidatorFormComponent,
    EqualValidatorDirective
  ],
  imports: [
    BrowserModule,
    FormsModule, // 使用模板式表单要引入。
    ReactiveFormsModule //使用模板式表单要引入。
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
