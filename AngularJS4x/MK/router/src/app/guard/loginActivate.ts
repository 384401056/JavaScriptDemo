import { CanActivate, ActivatedRouteSnapshot, CanDeactivate } from "@angular/router";

/**
 * 创建一个进入路由的守卫，实现CanActivate接口。
 */
export class LoginActivate implements CanActivate {
    private num: number;
    canActivate(): boolean {
        //随机数如果小于0.5,就返回true
        this.num = Math.random();
        console.log(this.num);
        return this.num < 0.5
    }
}
