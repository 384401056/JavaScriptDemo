angular.module('app')
    .constant('WebHost', {
        /* 支撑平台-平台管理-host */
        platformUrl: "http://10.88.20.104:8080/acp-support-platform",
        /* 图片服务器地址-host */
        imageUrl: "http://10.88.20.95/resource/",
        /*j监控中心地址*/
        monitorUrl:'http://10.88.20.104:8079/acp-web-monitor',
        /*报表地址*/
        reportUrl:'http://10.88.20.104:8081/acp-web-report',
        /*专家地址*/
        expertUrl:'http://10.88.20.104:8084/acp-web-expert/',
        /*溯源管理url*/
        traceUrl:"http://10.88.20.68:9097/acp-web-trace/"
    });
    