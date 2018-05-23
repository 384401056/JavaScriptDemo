import { BrowserModule } from '@angular/platform-browser'; /*BrowserModule，浏览器解析的模块*/
import { NgModule } from '@angular/core'; /*angualrjs核心模块*/
import { FormsModule} from '@angular/forms'; /*表单数据绑定 表单验证需要的模块*/
import { HttpModule, JsonpModule } from '@angular/http'; /*数据请求模块*/
import { AppComponent } from './app.component';
import { HearderComponent } from './component/hearder/hearder.component';
import { EventcompComponent } from './component/eventcomp/eventcomp.component';
import { TodolistComponent } from './component/todolist/todolist.component';
import { StorageService} from './services/storage.service';
import { GethttpComponent } from './component/gethttp/gethttp.component';


@NgModule({
  declarations: [ /**当前项目运行的组件，自定义组件也要在这里引入 */
    AppComponent,
    TodolistComponent,
    GethttpComponent,
    HearderComponent,
    EventcompComponent
  ],
  imports: [ /**当前项目依赖的模块 */
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule
  ],
  providers: [StorageService], /**定义的服务 */
  bootstrap: [AppComponent] /**默认启动哪个组件 */
})

/**其实根模块不需要导出，因为没有谁要导入它,但也一定要写。*/
export class AppModule { }
