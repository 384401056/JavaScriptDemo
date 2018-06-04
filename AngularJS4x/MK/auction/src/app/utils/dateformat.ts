/**   
 *转换日期对象为日期字符串   
 * @param l long值   
 * @param pattern 格式字符串,例如：yyyy-MM-dd hh:mm:ss   
 * @return 符合要求的日期字符串   
 */    
export function getFormatDate(date, pattern) {  
    if (date == undefined) {  
        date = new Date();  
    }  
    if (pattern == undefined) {  
        pattern = "yyyy-MM-dd hh:mm:ss";  
    }  

    let o = {  
            "M+": date.getMonth() + 1,  
            "d+": date.getDate(),  
            "h+": date.getHours(),  
            "m+": date.getMinutes(),  
            "s+": date.getSeconds(),  
            "q+": Math.floor((date.getMonth() + 3) / 3),  
            "S":  date.getMilliseconds()  
        };  
    if (/(y+)/.test(pattern)) {  
        pattern = pattern.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));  
    }  

    for (let k in o) {  
        if (new RegExp("(" + k + ")").test(pattern)) {  
            pattern = pattern.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));  
        }  
    }  

    return pattern;  
}

