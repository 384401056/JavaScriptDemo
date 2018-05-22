import { HomeComponent } from "../home/home.component";
import { CanDeactivate } from "@angular/router";

export class UnSaveGuard implements CanDeactivate<HomeComponent> {
    canDeactivate(component: HomeComponent): boolean {
        return window.confirm("确定要离开本页面吗？")
    }
}