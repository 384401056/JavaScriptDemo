import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HearderComponent } from './component/hearder/hearder.component';
import { EventcompComponent } from './component/eventcomp/eventcomp.component';
import { FormsModule } from '@angular/forms';
import { TodolistComponent } from './component/todolist/todolist.component';
import { StorageService} from './services/storage.service';
import { GethttpComponent } from './component/gethttp/gethttp.component';
import { HttpModule, JsonpModule } from '@angular/http';

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
